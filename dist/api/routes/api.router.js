"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = __importDefault(require("../controllers/api.controller"));
const apiRouter = (0, express_1.Router)();
apiRouter.route("/").get(api_controller_1.default);
exports.default = apiRouter;
