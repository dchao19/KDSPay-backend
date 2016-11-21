import express from 'express';

import authorizationRoutes from './authorization/authorizationRoutes.js';

let router = express.Router();

router.use('/authorization', authorizationRoutes);

export default router;
