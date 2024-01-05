"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const loginRouter = (0, express_1.Router)();
loginRouter.route("/").get(login_controller_1.spotifyAuth);
loginRouter.route("/callback").get(login_controller_1.spotifyAccess);
exports.default = loginRouter;
