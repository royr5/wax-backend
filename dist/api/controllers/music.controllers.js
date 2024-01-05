"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMusic = void 0;
const music_models_1 = require("../models/music.models");
const getAllMusic = (req, res, next) => {
    (0, music_models_1.selectAllMusic)(req.query)
        .then((music) => {
        res.status(200).send({ music });
    })
        .catch((err) => {
        res.status(404).send({ msg: 'not found' });
    });
};
exports.getAllMusic = getAllMusic;
