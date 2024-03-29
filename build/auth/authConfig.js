'use strict';

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _Account = require('../account/Account.js');

var _Account2 = _interopRequireDefault(_Account);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _profileRequest = require('./profileRequest.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ExtractJWT = _passportJwt2.default.ExtractJwt;
var JWTStrategy = _passportJwt2.default.Strategy;

var jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: Buffer.from(_config2.default.auth.secret, 'base64')
};

var serializer = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(jwtPayload, done) {
        var userProfile, user, userData, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _profileRequest.requestProfile)(jwtPayload.sub);

                    case 2:
                        userProfile = _context.sent;

                        console.log(userProfile);
                        _context.prev = 4;
                        _context.next = 7;
                        return _Account2.default.findOne({ userID: jwtPayload.sub });

                    case 7:
                        user = _context.sent;

                        if (!user) {
                            _context.next = 10;
                            break;
                        }

                        return _context.abrupt('return', done(null, user));

                    case 10:
                        userData = {
                            email: userProfile.email,
                            name: userProfile.name,
                            userID: jwtPayload.sub,
                            currentBalance: 0
                        };


                        user = new _Account2.default(userData);
                        _context.next = 14;
                        return user.save();

                    case 14:
                        result = _context.sent;
                        return _context.abrupt('return', done(null, result));

                    case 18:
                        _context.prev = 18;
                        _context.t0 = _context['catch'](4);
                        return _context.abrupt('return', done(_context.t0, false));

                    case 21:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[4, 18]]);
    }));

    return function serializer(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

_passport2.default.use(new JWTStrategy(jwtOptions, serializer));