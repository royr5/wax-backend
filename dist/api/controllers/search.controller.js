"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchedMusic = void 0;
const api_1 = require("../../utils/api");
const login_models_1 = require("../models/login.models");
const getSearchedMusic = async (req, res, next) => {
    const { q, type } = req.query;
    const { access_token } = await (0, login_models_1.refreshAccessToken)(req);
    const matchedMusic = await (0, api_1.searchSpotify)(access_token, q, type);
    console.log("🚀 ~ matchedMusic:", matchedMusic.data);
};
exports.getSearchedMusic = getSearchedMusic;
