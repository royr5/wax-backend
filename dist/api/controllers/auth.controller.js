"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserCredentials = void 0;
const auth_model_1 = require("../models/auth.model");
const checkUserCredentials = async (req, res, next) => {
    try {
        const { body: { username, password }, } = req;
        const areValidCredentials = await (0, auth_model_1.authenticateUser)(username, password);
        res.status(200).send({ areValidCredentials });
    }
    catch (err) {
        next(err);
    }
};
exports.checkUserCredentials = checkUserCredentials;
