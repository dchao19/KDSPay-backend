import express from 'express';
import passport from 'passport';

let router = express.Router();
router.get('/login', (req, res) => {
    res.render('login.pug');
});

router.get('/echo', (req, res) => {
    res.send(req.query.userJWT);
});

router.get('/status', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        success: true,
        message: "Succesfully authenticated.",
        result: {
            authenticated: true
        }
    });
});

export default router;
