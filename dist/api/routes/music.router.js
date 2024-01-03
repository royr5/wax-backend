"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const music_controllers_1 = require("../controllers/music.controllers");
const musicRouter = (0, express_1.Router)();
musicRouter.route('/').get(music_controllers_1.getAllMusic);
exports.default = musicRouter;
