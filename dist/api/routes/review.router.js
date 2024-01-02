"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewRouter = (0, express_1.Router)();
reviewRouter.route("/:album_id").get();
exports.default = reviewRouter;
