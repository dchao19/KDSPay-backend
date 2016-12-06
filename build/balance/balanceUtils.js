'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deductBalance = undefined;

var _Account = require('../account/Account.js');

var _Account2 = _interopRequireDefault(_Account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var deductBalance = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(userID, amount) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function () {
                            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
                                var user, newBalance;
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return _Account2.default.findOne({ userID: userID });

                                            case 2:
                                                user = _context.sent;
                                                newBalance = user.currentBalance - amount;

                                                if (newBalance < 0) {
                                                    reject({ type: 'insufficientFunds' });
                                                }

                                                user.currentBalance = newBalance;
                                                user.save(function (err) {
                                                    if (err) {
                                                        reject({ type: 'serverError' });
                                                    }
                                                    resolve(newBalance);
                                                });

                                            case 7:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x3, _x4) {
                                return _ref2.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function deductBalance(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.deductBalance = deductBalance;