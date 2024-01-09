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
    // console.log("🚀 ~ searchSpotify ~ reqString:", reqString)
    try {
        return await (0, axios_1.default)({
            method: "get",
            // url: "https://api.spotify.com/v1/search?q=take%2520care&type=track%2Calbum&market=GB",
            url: reqString,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    catch (err) {
        // console.log("🚀 ~ searchSpotify ~ err:", err);
    }
};
exports.searchSpotify = searchSpotify;
