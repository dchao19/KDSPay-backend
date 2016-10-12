'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var TransactionSchema = new Schema({
    amount: Number,
    transactionType: String,
    authorizer: String
});

TransactionSchema.plugin(_mongooseTimestamp2.default);

var Transaction = _mongoose2.default.model('Transaction', TransactionSchema);

exports.default = Transaction;