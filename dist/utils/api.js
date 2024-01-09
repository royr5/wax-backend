"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSpotify = void 0;
const axios_1 = __importDefault(require("axios"));
const searchSpotify = async (token, q, type) => {
    const types = type || "track,album,artist";
    const reqString = `https://api.spotify.com/v1/search?q=${q}&type=${types}`;
    try {
        return await (0, axios_1.default)({
            method: "get",
            url: reqString,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (err) {
        console.log("🚀 ~ searchSpotify ~ err:", err);
    }
};
exports.searchSpotify = searchSpotify;
