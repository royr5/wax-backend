"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const loginRouter = (0, express_1.Router)();
loginRouter.route("/login").get(login_controller_1.spotifyAuth);
loginRouter.route("/login/callback").get(login_controller_1.spotifyAccess);
loginRouter.route("/refresh_token").get(login_controller_1.getAccessToken);
exports.default = loginRouter;
