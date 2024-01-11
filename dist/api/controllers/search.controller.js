"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchedMusic = void 0;
const music_models_1 = require("../models/music.models");
const getSearchedMusic = async (req, res, next) => {
    const { matchedMusic } = req.body;
    try {
        if (matchedMusic) {
            const storedMusic = (await (0, music_models_1.selectAllMusic)(undefined, true));
            const storedMusicIds = storedMusic.map((music) => music.music_id);
            const musicOverlap = storedMusic.filter((music) => matchedMusic.some((matched) => matched.music_id === music.music_id));
            const musicDifference = matchedMusic.filter((music) => !storedMusicIds.includes(music.music_id));
            if (!musicDifference.length) {
                res.status(200).send({ music: musicOverlap });
            }
            else {
                const insertedMusic = await (0, music_models_1.insertMusic)(musicDifference);
                const mergedMusic = Array.isArray(insertedMusic)
                    ? [...musicOverlap, ...insertedMusic]
                    : [...musicOverlap, insertedMusic];
                res.status(200).send({ music: mergedMusic });
            }
        }
    }
    catch (err) {
        next(err);
    }
};
exports.getSearchedMusic = getSearchedMusic;
