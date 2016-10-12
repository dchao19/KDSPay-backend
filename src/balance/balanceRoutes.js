import express from 'express';
import passport from 'passport';
import Account from '../account/Account';

let router = express.Router(); //eslint-disable-line

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({message: "Balance Ready"});
});

export default router;
