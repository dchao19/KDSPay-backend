'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Account = require('../../account/Account');

var _Account2 = _interopRequireDefault(_Account);

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _errors = require('../../errors/errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.get('/create', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var user, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _Account2.default.findOne({ userID: req.user.userID });

                    case 3:
                        user = _context.sent;

                        if (!user) {
                            _context.next = 12;
                            break;
                        }

                        token = _jsonwebtoken2.default.sign({ sub: req.user.email }, _config2.default.auth.transactionSecret, {
                            expiresIn: "2m",
                            issuer: "transactions.kdspay.org"
                        });


                        user.pendingAuthorizations.push(token);
                        user.markModified('pendingAuthorizations');
                        user.save();

                        return _context.abrupt('return', res.send({
                            success: true,
                            result: {
                                token: token
                            }
                        }));

                    case 12:
                        return _context.abrupt('return', res.status(404).send((0, _errors.noAccountError)()));

                    case 13:
                        _context.next = 18;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', res.status(500).send((0, _errors.internalServerError)()));

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 15]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/*
router.post('/verify', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let token = req.body.token;
        if (typeof token === 'undefined' || !token) {
            return res.status(400).send(missingDataError("User JWT/Token"));
        }

        let decoded = jwt.verify(token, config.auth.transactionSecret);

        return res.send({
            success: true,
            result: {
                validated: true,
                payload: decoded
            }
        });
    } catch (error) {
        return res.status(401).send(invalidTokenError());
    }
});
*/

router.post('/confirm', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var token, decoded, user, matched;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        token = req.body.tokent;

                        if (!(typeof token === 'undefined' || !token)) {
                            _context2.next = 4;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send((0, _errors.missingDataError)('User JWT/Token')));

                    case 4:
                        decoded = _jsonwebtoken2.default.verify(token, _config2.default.auth.transactionSecret);
                        _context2.prev = 5;
                        _context2.next = 8;
                        return _Account2.default.findOne({ email: decoded.sub });

                    case 8:
                        user = _context2.sent;
                        matched = user.pendingAuthorizations.includes(token);

                        user.pendingAuthorizations.pop();
                        user.save();

                        return _context2.abrupt('return', res.send({
                            sucess: true,
                            result: {
                                validated: true,
                                confirmed: matched,
                                payload: matched ? user : {}
                            }
                        }));

                    case 15:
                        _context2.prev = 15;
                        _context2.t0 = _context2['catch'](5);
                        return _context2.abrupt('return', res.status(500).send((0, _errors.internalServerError)()));

                    case 18:
                        _context2.next = 23;
                        break;

                    case 20:
                        _context2.prev = 20;
                        _context2.t1 = _context2['catch'](0);
                        return _context2.abrupt('return', res.status(401).send((0, _errors.invalidTokenError)()));

                    case 23:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 20], [5, 15]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());
exports.default = router;