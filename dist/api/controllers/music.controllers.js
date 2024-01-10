"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMusic = exports.getAllMusic = void 0;
const music_models_1 = require("../models/music.models");
const getAllMusic = (req, res, next) => {
    (0, music_models_1.selectAllMusic)(req.query)
        .then((music) => {
        res.status(200).send({ music });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllMusic = getAllMusic;
const addMusic = async (req, res, next) => {
    const { body } = req;
    try {
        (await (0, music_models_1.insertMusic)(body)) && res.status(201).send({ msg: "created" });
    }
    catch (err) {
        next(err);
    }
};
exports.addMusic = addMusic;
