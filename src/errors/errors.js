let noAccountError = () => {
    return {
        success: false,
        errorCode: 0,
        errorMessage: "An internal server error has occured. Your account does not seem to exist!"
    };
};

let internalServerError = () => {
    return {
        success: false,
        errorCode: 1,
        errorMessage: "An internal server error has occured."
    };
};

let notTellerError = () => {
    return {
        success: false,
        errorCode: 2,
        errorMessage: "This action requires a teller-elevated account"
    };
};

let missingDataError = (dataType) => {
    return {
        success: false,
        errorCode: 3,
        errorMessage: "The following fields were not provided in the body: " + dataType
    };
};

let invalidTokenError = () => {
    return {
        success: false,
        errorCode: 4,
        errorMessage: "The token provided in the request was invalid"
    };
};

let insufficientFundsError = () => {
    return {
        success: false,
        errorCode: 5,
        errorMessage: "The account has insufficient funds"
    };
};

export {
    noAccountError,
    internalServerError,
    notTellerError,
    missingDataError,
    invalidTokenError,
    insufficientFundsError
};
