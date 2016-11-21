'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authorizationRoutes = require('./authorization/authorizationRoutes.js');

var _authorizationRoutes2 = _interopRequireDefault(_authorizationRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/authorization', _authorizationRoutes2.default);

exports.default = router;