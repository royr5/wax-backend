"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchedMusic = void 0;
const api_1 = require("../../utils/api");
const login_models_1 = require("../models/login.models");
const music_models_1 = require("../models/music.models");
const getSearchedMusic = async (req, res, next) => {
    const { q, type } = req.query;
    try {
        const { access_token } = await (0, login_models_1.refreshAccessToken)();
        const matchedMusic = (await (0, api_1.searchSpotify)(access_token, q, type));
        if (matchedMusic) {
            const storedMusic = (await (0, music_models_1.selectAllMusic)());
            const storedMusicIds = storedMusic.map((music) => music.music_id);
            const musicOverlap = storedMusic.filter((music) => matchedMusic.some((matched) => matched.music_id === music.music_id));
            const musicDifference = matchedMusic.filter((music) => !storedMusicIds.includes(music.music_id));
            const insertedMusic = await (0, music_models_1.insertMusic)(musicDifference);
            const mergedMusic = Array.isArray(insertedMusic)
                ? [...musicOverlap, ...insertedMusic]
                : [...musicOverlap, insertedMusic];
            res.status(200).send({ music: mergedMusic });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getSearchedMusic = getSearchedMusic;
