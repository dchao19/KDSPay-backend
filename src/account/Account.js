import mongoose from 'mongoose';
let Schema = mongoose.Schema;

var AccountSchema = new Schema({
    email: String,
    name: String,
    userID: String,
    currentBalance: Number,
    devices: [String],
    accountType: String,
    transactions: [{type: Schema.ObjectId, ref: 'Transaction'}]
});

let Account = mongoose.model('Account', AccountSchema);

export default Account;
