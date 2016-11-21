'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var AccountSchema = new Schema({
    email: String,
    name: String,
    userID: String,
    currentBalance: Number,
    devices: [String],
    secrets: [String],
    accountType: String,
    pendingAuthorizations: [String],
    pendingTransactions: [String],
    completedTransactions: [String]
});

var Account = _mongoose2.default.model('Account', AccountSchema);

exports.default = Account;