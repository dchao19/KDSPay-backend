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

export {
    noAccountError,
    internalServerError,
    notTellerError,
    missingDataError
};
