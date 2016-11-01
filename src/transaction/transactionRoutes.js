import express from 'express';
import passport from 'passport';
import Account from '../account/Account';
import jwt from 'jsonwebtoken';
import config from '../config.js';

import {
    noAccountError,
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

            user.pendingAuthorizations.push(token);
            user.markModified('pendingAuthorizations');
            user.save();

            return res.send({
                success: true,
                result: {
                    token
                }
            });
        } else {
            return res.status(404).send(noAccountError());
        }
    } catch (error) {
        return res.status(500).send(internalServerError());
    }
});

router.post('/verify', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let token = req.body.token;
        if (typeof token === 'undefined' || !token) {
            return res.status(400).send(missingDataError("User JWT/Token"));
        }

        let decoded = jwt.verify(token, config.auth.transactionSecret);

        return res.send({
            success: true,
            result: {
                validated: true,
                payload: decoded
            }
        });
    } catch (error) {
        return res.status(401).send(invalidTokenError());
    }
});

router.post('/confirm', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let user = await Account.findOne({userID: req.user.userID});
        if (user) {
            let token = req.body.token;
            if (typeof token === 'undefined' || !token) {
                return res.status(400).send(missingDataError("User JWT/Token"));
            }
            try {
                let decoded = jwt.verify(token, config.auth.transactionSecret);
                let matched = user.pendingAuthorizations.includes(token);
                return res.send({
                    success: true,
                    result: {
                        validated: true,
                        confirmed: matched,
                        payload: decoded,
                        userID: matched ? req.user.userID : ""
                    }
                });
            } catch (e) {
                return res.status(401).send(invalidTokenError());
            }
        } else {
            return res.status(500).send(noAccountError());
        }
    } catch (error) {
        return res.status(500).send(internalServerError());
    }
});
export default router;
