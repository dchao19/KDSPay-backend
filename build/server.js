'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _indexRoutes = require('./index/indexRoutes');

var _indexRoutes2 = _interopRequireDefault(_indexRoutes);

var _balanceRoutes = require('./balance/balanceRoutes');

var _balanceRoutes2 = _interopRequireDefault(_balanceRoutes);

var _authRoutes = require('./auth/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _transactionRoutes = require('./transaction/transactionRoutes');

var _transactionRoutes2 = _interopRequireDefault(_transactionRoutes);

var _deviceRegistrationRoutes = require('./deviceRegistration/deviceRegistrationRoutes.js');

var _deviceRegistrationRoutes2 = _interopRequireDefault(_deviceRegistrationRoutes);

var _billingRoutes = require('./billing/billingRoutes.js');

var _billingRoutes2 = _interopRequireDefault(_billingRoutes);

require('./dbInit.js');

require('./auth/authConfig.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = _config2.default.port;

app.set('view engine', 'pug');
app.set('views', ['./src/auth', './src/billing']);

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(_passport2.default.initialize());

app.use('/', _indexRoutes2.default);
app.use('/balance', _balanceRoutes2.default);
app.use('/auth', _authRoutes2.default);
app.use('/transaction', _transactionRoutes2.default);
app.use('/devices', _deviceRegistrationRoutes2.default);
app.use('/billing', _billingRoutes2.default);

app.listen(port, function () {
    console.log('Express server listening on port: ' + port);
});

exports.default = app;