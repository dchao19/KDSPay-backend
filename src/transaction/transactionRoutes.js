import express from 'express';
import passport from 'passport';
import Account from '../account/Account';
import jwt from 'jsonwebtoken';
import config from '../config.js';

import {
    internalServerError,
    missingDataError,
    invalidTokenError
} from '../errors/errors.js';

let router = express.Router();

router.get('/create', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let user = await Account.findOne({userID: req.user.userID});
        if (user) {
            let token = jwt.sign({sub: req.user.email}, config.auth.transactionSecret, {
                expiresIn: "2m",
                issuer: "transactions.kdspay.org"
            });
            
            res.send({
                success: true,
                result: {
                    token
                }
            });
        }
    } catch (error) {
        return res.status(500).send(internalServerError());
    }
});

router.post('/verify', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let token = req.body.token;
        if (typeof token === 'undefined' || !token) {
            res.status(400).send(missingDataError("User JWT/Token"));
            return;
        }

        let decoded = jwt.verify(token, config.auth.transactionSecret);

        res.send({
            success: true,
            result: {
                validated: true,
                payload: decoded
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send(invalidTokenError);
    }
});

export default router;
