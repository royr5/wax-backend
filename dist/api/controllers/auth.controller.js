"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserCredentials = void 0;
const auth_model_1 = require("../models/auth.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkUserCredentials = async (req, res, next) => {
    try {
        const { body: { username, password: passwordAttempt }, } = req;
        const dbCredentials = await (0, auth_model_1.authenticateUser)(username, passwordAttempt);
        if (!dbCredentials) {
            res.status(200).send({
                areValidCredentials: {
                    isValidUsername: false,
                    isValidPassword: false,
                },
            });
        }
        else {
            const isValidUsername = "username" in dbCredentials;
            const isValidPassword = await bcryptjs_1.default.compare(passwordAttempt, dbCredentials.password);
            res.status(200).send({
                areValidCredentials: {
                    isValidUsername,
                    isValidPassword,
                },
            });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.checkUserCredentials = checkUserCredentials;
