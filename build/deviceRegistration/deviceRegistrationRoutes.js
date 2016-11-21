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

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _base64Url = require('base64-url');

var _base64Url2 = _interopRequireDefault(_base64Url);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _Account = require('../account/Account.js');

var _Account2 = _interopRequireDefault(_Account);

var _errors = require('../errors/errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.use(_passport2.default.authenticate('jwt', { session: false }));

router.get('/', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var user, deviceJwt, deviceSecret;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _Account2.default.findOne({ userID: req.user.userID });

                    case 3:
                        user = _context.sent;

                        if (!(user.accountType !== 'Teller')) {
                            _context.next = 7;
                            break;
                        }

                        res.status(401).send((0, _errors.notTellerError)());
                        return _context.abrupt('return');

                    case 7:
                        _context.prev = 7;
                        deviceJwt = _jsonwebtoken2.default.sign({}, _config2.default.deviceRegistration.secret);
                        deviceSecret = _base64Url2.default.encode(_crypto2.default.randomBytes(64));

                        user.secrets.push(deviceSecret);
                        user.devices.push(deviceJwt);
                        user.save();

                        res.send({
                            success: true,
                            result: {
                                deviceJwt: deviceJwt,
                                deviceSecret: deviceSecret
                            }
                        });
                        _context.next = 19;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](7);
                        throw new Error(_context.t0);

                    case 19:
                        _context.next = 25;
                        break;

                    case 21:
                        _context.prev = 21;
                        _context.t1 = _context['catch'](0);

                        console.log(_context.t1);
                        res.status(404).send((0, _errors.noAccountError)());

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 21], [7, 16]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = router;