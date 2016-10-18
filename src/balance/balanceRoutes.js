import express from 'express';
import passport from 'passport';
import Account from '../account/Account';

import {noAccountError, internalServerError} from '../errors/errors.js';

let router = express.Router(); //eslint-disable-line

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let user = await Account.findOne({email: req.user.email});
        if (user) {
            return res.json({
                success: true,
                result: {
                    currentBalance: user.currentBalance
                }
            });
        }
        return res.status(404).send(noAccountError());
    } catch (e) {
        return res.status(500).send(internalServerError());
    }
});

export default router;
