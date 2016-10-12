'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dbOptions = {
    user: _config2.default.db.username,
    pass: _config2.default.db.password
};

var connectionURI = 'mongodb://' + _config2.default.db.hostname + ':' + _config2.default.db.port + '/' + _config2.default.db.databaseName;

_mongoose2.default.connect(connectionURI, dbOptions);