"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var noAccountError = function noAccountError() {
    return {
        success: false,
        errorCode: 0,
        errorMessage: "An internal server error has occured. Your account does not seem to exist!"
    };
};

var internalServerError = function internalServerError() {
    return {
        success: false,
        errorCode: 1,
        errorMessage: "An internal server error has occured."
    };
};

var notTellerError = function notTellerError() {
    return {
        success: false,
        errorCode: 2,
        errorMessage: "This action requires a teller-elevated account"
    };
};

var missingDataError = function missingDataError(dataType) {
    return {
        success: false,
        errorCode: 3,
        errorMessage: "The following fields were not provided in the body: " + dataType
    };
};

var invalidTokenError = function invalidTokenError() {
    return {
        success: false,
        errorCode: 4,
        errorMessage: "The token provided in the request was invalid"
    };
};

var insufficientFundsError = function insufficientFundsError() {
    return {
        success: false,
        errorCode: 5,
        errorMessage: "The account has insufficient funds"
    };
};

exports.noAccountError = noAccountError;
exports.internalServerError = internalServerError;
exports.notTellerError = notTellerError;
exports.missingDataError = missingDataError;
exports.invalidTokenError = invalidTokenError;
exports.insufficientFundsError = insufficientFundsError;