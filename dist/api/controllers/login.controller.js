"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = exports.spotifyAccess = exports.spotifyAuth = void 0;
const login_models_1 = require("../models/login.models");
const spotifyAuth = async (_req, res, next) => {
    try {
        await (0, login_models_1.userAuth)(res);
    }
    catch (err) {
        next(err);
    }
};
exports.spotifyAuth = spotifyAuth;
const spotifyAccess = async (req, res, next) => {
    try {
        await (0, login_models_1.requestToken)(req, res);
    }
    catch (err) {
        throw err;
    }
    res.redirect("http://northcoders.com");
};
exports.spotifyAccess = spotifyAccess;
const getAccessToken = async (req, _res, next) => {
    try {
        await (0, login_models_1.refreshAccessToken)(req);
    }
    catch (err) {
        next(err);
    }
};
exports.getAccessToken = getAccessToken;
