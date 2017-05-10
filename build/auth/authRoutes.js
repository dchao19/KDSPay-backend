'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/login', function (req, res) {
    res.render('login.pug');
});

router.get('/echo', function (req, res) {
    res.send(req.query.userJWT);
});

router.get('/status', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
    res.json({
        success: true,
        message: "Succesfully authenticated.",
        result: {
            authenticated: true
        }
    });
});

exports.default = router;