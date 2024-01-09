"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchedMusic = void 0;
const api_1 = require("../../utils/api");
const getSearchedMusic = (req, res, next) => {
    console.log(req.query);
    (0, api_1.searchSpotify)().then((res) => {
        console.log("🚀 ~ searchSpotify ~ res:", res);
    });
};
exports.getSearchedMusic = getSearchedMusic;
