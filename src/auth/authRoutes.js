import express from 'express';

let router = express.Router();
router.get('/login', (req, res) => {
    res.render('login.pug');
});

export default router;