import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

let Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    amount: Number,
    transactionType: String,
    authorizer: String
});

TransactionSchema.plugin(timestamps);

let Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
