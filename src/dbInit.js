import mongoose from 'mongoose';
import config from './config.js';

let dbOptions = {
    user: config.db.username,
    pass: config.db.password
};

let connectionURI = `mongodb://${config.db.hostname}:${config.db.port}/${config.db.databaseName}`;

mongoose.connect(connectionURI, dbOptions);
