import mongoose from 'mongoose';
let Schema = mongoose.Schema;

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

let Account = mongoose.model('Account', AccountSchema);

export default Account;
