'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authorizationRoutes = require('./authorization/authorizationRoutes.js');

var _authorizationRoutes2 = _interopRequireDefault(_authorizationRoutes);

var _Transaction = require('./Transaction.js');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _Account = require('../account/Account.js');

var _Account2 = _interopRequireDefault(_Account);

var _balanceUtils = require('../balance/balanceUtils.js');

var _errors = require('../errors/errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.use('/authorization', _authorizationRoutes2.default);

router.post('/execute', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var _ret;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        return _context4.delegateYield(regeneratorRuntime.mark(function _callee3() {
                            var transactionToken, user, decoded;
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            transactionToken = req.body.token;

                                            if (!(typeof transactionToken === 'undefined' || !transactionToken)) {
                                                _context3.next = 3;
                                                break;
                                            }

                                            return _context3.abrupt('return', {
                                                v: res.status(400).send((0, _errors.missingDataError)("Transaction JWT/Token"))
                                            });

                                        case 3:
                                            _context3.next = 5;
                                            return _Account2.default.findOne({ userID: req.user.userID });

                                        case 5:
                                            user = _context3.sent;

                                            if (user) {
                                                _context3.next = 8;
                                                break;
                                            }

                                            return _context3.abrupt('return', {
                                                v: res.status(404).send((0, _errors.noAccountError)())
                                            });

                                        case 8:
                                            decoded = void 0;

                                            _async2.default.each(user.secrets, function (deviceSignature, done) {
                                                try {
                                                    console.log(deviceSignature);
                                                    decoded = _jsonwebtoken2.default.verify(transactionToken, deviceSignature);
                                                    done();
                                                } catch (e) {
                                                    console.log('err');
                                                    done();
                                                }
                                            }, _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                                                var existingTransaction;
                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                if (decoded) {
                                                                    _context2.next = 2;
                                                                    break;
                                                                }

                                                                return _context2.abrupt('return', res.status(401).send());

                                                            case 2:
                                                                _context2.next = 4;
                                                                return _Transaction2.default.findOne({ signature: transactionToken });

                                                            case 4:
                                                                existingTransaction = _context2.sent;

                                                                if (!existingTransaction) {
                                                                    _context2.next = 7;
                                                                    break;
                                                                }

                                                                return _context2.abrupt('return', res.status(409).send());

                                                            case 7:
                                                                _context2.prev = 7;
                                                                return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                                                                    var newBalance, newTransaction;
                                                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                                                        while (1) {
                                                                            switch (_context.prev = _context.next) {
                                                                                case 0:
                                                                                    _context.next = 2;
                                                                                    return (0, _balanceUtils.deductBalance)(decoded.userID, decoded.amount);

                                                                                case 2:
                                                                                    newBalance = _context.sent;
                                                                                    newTransaction = new _Transaction2.default({ signature: transactionToken });

                                                                                    newTransaction.save(function (err) {
                                                                                        if (err) {
                                                                                            return res.status(500).send((0, _errors.internalServerError)());
                                                                                        }
                                                                                        res.send({
                                                                                            success: true,
                                                                                            message: 'Successfully completed transaction.',
                                                                                            result: {
                                                                                                newBalance: newBalance
                                                                                            }
                                                                                        });
                                                                                    });

                                                                                case 5:
                                                                                case 'end':
                                                                                    return _context.stop();
                                                                            }
                                                                        }
                                                                    }, _callee, undefined);
                                                                })(), 't0', 9);

                                                            case 9:
                                                                _context2.next = 22;
                                                                break;

                                                            case 11:
                                                                _context2.prev = 11;
                                                                _context2.t1 = _context2['catch'](7);

                                                                if (!(_context2.t1.type === 'insufficientFunds')) {
                                                                    _context2.next = 17;
                                                                    break;
                                                                }

                                                                return _context2.abrupt('return', res.status(402).send((0, _errors.insufficientFundsError)()));

                                                            case 17:
                                                                if (!(_context2.t1.type === 'serverError')) {
                                                                    _context2.next = 21;
                                                                    break;
                                                                }

                                                                return _context2.abrupt('return', res.status(500).send((0, _errors.internalServerError)()));

                                                            case 21:
                                                                return _context2.abrupt('return', res.status(500).send((0, _errors.internalServerError)()));

                                                            case 22:
                                                            case 'end':
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, undefined, [[7, 11]]);
                                            })));

                                        case 10:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee3, undefined);
                        })(), 't0', 2);

                    case 2:
                        _ret = _context4.t0;

                        if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt('return', _ret.v);

                    case 5:
                        _context4.next = 10;
                        break;

                    case 7:
                        _context4.prev = 7;
                        _context4.t1 = _context4['catch'](0);
                        return _context4.abrupt('return', res.status(500).send((0, _errors.internalServerError)()));

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = router;