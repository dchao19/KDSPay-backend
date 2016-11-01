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

var _config = require('../config/config.js');

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
        var user, _jwt;

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
                        _jwt = _jwt.sign({}, _config2.default.deviceRegistration.secret);

                        user.devices.push(_jwt);
                        user.markModified();
                        user.save();

                        _context.next = 16;
                        break;

                    case 13:
                        _context.prev = 13;
                        _context.t0 = _context['catch'](0);

                        res.status(404).send((0, _errors.noAccountError)());

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 13]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = router;