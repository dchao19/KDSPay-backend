import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import base64url from 'base64-url';

import config from '../config.js';
import Account from '../account/Account.js';
import {
    noAccountError,
    notTellerError
} from '../errors/errors.js';

let router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.get('/', async (req, res) => {
    try {
        let user = await Account.findOne({userID: req.user.userID});
        if (user.accountType !== 'Teller') {
            res.status(401).send(notTellerError());
            return;
        }

        try {
            let deviceJwt = jwt.sign({}, config.deviceRegistration.secret);
            let deviceSecret = base64url.encode(crypto.randomBytes(64));
            user.secrets.push(deviceSecret);
            user.devices.push(deviceJwt);
            user.save();

            res.send({
                success: true,
                result: {
                    deviceJwt,
                    deviceSecret
                }
            });
        } catch (e) {
            throw new Error(e);
        }
    } catch (e) {
        console.log(e);
        res.status(404).send(noAccountError());
    }
});

export default router;
