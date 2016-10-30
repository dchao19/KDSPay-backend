import express from 'express';
import passport from 'passport';

import Account from '../account/Account.js';
import {noAccountError, notTellerError} from '../errors/errors.js';

let router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));

router.post('/', async (req, res) => {
    try {
        let user = await Account.findOne({userID: req.user.userID});
        if (user.accountType !== 'Teller') {
            res.status(401).send(notTellerError());
            return;
        }

        if (typeof req.body.deviceID === 'undefined') {
            res.status(400).send({
                
            })
        }


    } catch (e) {
        res.status(404).send(noAccountError());
    }
});

export default router;
