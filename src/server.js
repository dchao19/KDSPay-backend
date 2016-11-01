import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from './config.js';

import indexRoutes from './index/indexRoutes';
import balanceRoutes from './balance/balanceRoutes';
import authRoutes from './auth/authRoutes';
import transactionRoutes from './transaction/transactionRoutes';

import './dbInit.js';
import './auth/authConfig.js';

let app = express();
let port = config.port;

app.set('view engine', 'pug');
app.set('views', [
    './src/auth'
]);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());

app.use('/', indexRoutes);
app.use('/balance', balanceRoutes);
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);

app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
});

export default app;
