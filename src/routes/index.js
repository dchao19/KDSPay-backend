import express from 'express';
let router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "API OK"});
});

export default router;