import express from 'express';

let router = express.Router();
router.get('/login', (req, res) => {
    res.render('login.pug');
});

router.get('/echo', (req, res) => {
    res.send(req.query.userJWT);
});
export default router;
