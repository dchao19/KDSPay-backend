import express from 'express';
let router = express.Router(); //eslint-disable-line

router.get('/', (req, res) => {
    res.json({message: "API OK"});
});

export default router;
