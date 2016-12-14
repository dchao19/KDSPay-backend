'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _stripe = require('stripe');

var _stripe2 = _interopRequireDefault(_stripe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var payments = (0, _stripe2.default)('sk_test_qfndc2aOVOlw9Je6c446ApYw');
var router = _express2.default.Router();

router.get('/payment', function (req, res) {
    res.render('payment.pug');
});

router.post('/payment/process', function (req, res) {
    var token = req.body.stripeToken;
    var charge = payments.charges.create({
        amount: 999,
        currency: 'usd',
        source: token,
        description: "Example charge"
    }, function (err, charge) {
        res.send("successful?");
    });
});

exports.default = router;