import Account from '../account/Account.js';

let deductBalance = async (userID, amount) => {
    return new Promise(async (resolve, reject) => {
        let user = await Account.findOne({userID});

        let newBalance = user.currentBalance - amount;
        if (newBalance < 0) {
            reject({type: 'insufficientFunds'});
        }

        user.currentBalance = newBalance;
        user.save((err) => {
            if (err) {
                reject({type: 'serverError'});
            }
            resolve(newBalance);
        });
    });
};

export {deductBalance};
