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

export {
    noAccountError,
    internalServerError
};
