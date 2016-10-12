'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.requestProfile = undefined;

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _authURLS = require('./authURLS.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestProfile = function requestProfile(userID) {
    return new Promise(function (resolve, reject) {
        var request = _unirest2.default.get('' + _authURLS.getUserProfile + userID);
        request.header('Authorization', 'Bearer ' + _config2.default.auth.userProfileSecret);
        request.end(function (response) {
            resolve(response.body);
        });
    });
};

exports.requestProfile = requestProfile;