import express from 'express';
import passport from 'passport';
import async from 'async';
import jwt from 'jsonwebtoken';

import authorizationRoutes from './authorization/authorizationRoutes.js';
import Transaction from './Transaction.js';
import Account from '../account/Account.js';

import {deductBalance} from '../balance/balanceUtils.js';

import {
    missingDataError,
    noAccountError,
    internalServerError,
    insufficientFundsError
} from '../errors/errors.js';

let router = express.Router();

router.use('/authorization', authorizationRoutes);

router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    let token = jwt.sign({userID: req.body.userID, amount: req.body.amount}, req.body.deviceToken);
    res.send({
        success: true,
        token
    });
});

router.post('/execute', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let transactionToken = req.body.token;
        if (typeof transactionToken === 'undefined' || !transactionToken) {
            return res.status(400).send(missingDataError("Transaction JWT/Token"));
        }

        let user = await Account.findOne({userID: req.user.userID});
        if (!user) {
            return res.status(404).send(noAccountError());
        }

        let decoded;
        async.each(user.secrets, (deviceSignature, done) => {
            try {
                console.log(deviceSignature);
                decoded = jwt.verify(transactionToken, deviceSignature);
                done();
            } catch (e) {
                console.log('err');
                done();
            }
        }, async () => {
            if (!decoded) {
                return res.status(401).send();
            }

            let existingTransaction = await Transaction.findOne({signature: transactionToken});
            if (existingTransaction) {
                return res.status(409).send();
            }
            try {
                let newBalance = await deductBalance(decoded.userID, decoded.amount);
                
                let newTransaction = new Transaction({signature: transactionToken});
                newTransaction.save((err) => {
                    if (err) {
                        return res.status(500).send(internalServerError());
                    }
                    res.send({
                        success: true,
                        message: 'Successfully completed transaction.',
                        result: {
                            newBalance
                        }
                    });
                });
            } catch (e) {
                if (e.type === 'insufficientFunds') {
                    return res.status(402).send(insufficientFundsError());
                } else if (e.type === 'serverError') {
                    return res.status(500).send(internalServerError());
                } else {
                    return res.status(500).send(internalServerError());
                }
            }
        });
    } catch (e) {
        return res.status(500).send(internalServerError());
    }
});

export default router;
