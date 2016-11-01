import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import config from '../config/config.js';
import Account from '../account/Account.js';
import {
    noAccountError, 
    notTellerError,
    missingDataError
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
        
        let jwt = jwt.sign({}, config.deviceRegistration.secret);
        user.devices.push(jwt);
        user.markModified();
        user.save();

    } catch (e) {
        res.status(404).send(noAccountError());
    }
});

export default router;
