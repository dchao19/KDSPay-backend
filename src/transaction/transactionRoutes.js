import express from 'express';
import passport from 'passport';
import Account from '../account/Account';
import jwt from 'jsonwebtoken';
import config from '../config.js';

import {internalServerError} from '../errors/errors.js';

let router = express.Router();

router.get('/create', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let user = await Account.findOne({userID: req.user.userID});
        if (user) {
            let token = jwt.sign({sub: req.user.userID}, config.auth.transactionSecret, {
                expiresIn: "2m",
                issuer: "transactions.kdspay.org"
            });
            
        }
    } catch (error) {
        return res.status(500).send(internalServerError());
    }
});