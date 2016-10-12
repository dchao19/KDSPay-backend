'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _Account = require('../account/Account');

var _Account2 = _interopRequireDefault(_Account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); //eslint-disable-line

router.get('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: "Balance Ready" });
});

exports.default = router;