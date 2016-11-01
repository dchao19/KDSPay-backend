let config = {
    port: 3000,
    db: {
        username: "",
        password: "",
        databaseName: "money",
        port: "27017",
        hostname: "localhost"
    },
    auth: {
        secret: "AUTH0_SECRET",
        userProfileSecret: "AUTH0_PROFILE_SECRET",
        transactionSecret: "TRANSACTION_SECRET"
    },
    deviceRegistration: {
        secret: "DEVICE_REG_SECRET"
    }
};

export default config;
