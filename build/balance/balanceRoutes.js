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

var _errors = require('../errors/errors.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router(); //eslint-disable-line

router.get('/', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        console.log(req.user);
                        _context.next = 4;
                        return _Account2.default.findOne({ userID: req.user.userID });

                    case 4:
                        user = _context.sent;

                        if (!user) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', res.json({
                            success: true,
                            result: {
                                currentBalance: user.currentBalance
                            }
                        }));

                    case 7:
                        return _context.abrupt('return', res.status(404).send((0, _errors.noAccountError)()));

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);
                        return _context.abrupt('return', res.status(500).send((0, _errors.internalServerError)()));

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 10]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

exports.default = router;