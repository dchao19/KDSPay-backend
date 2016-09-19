import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from './config.js';

import indexRoutes from './routes/index';

let app = express();
let port = config.port;

app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(indexRoutes);

app.listen(port, () => {
    console.log(`Express server listening on port: ${port}`);
});

export default app;
