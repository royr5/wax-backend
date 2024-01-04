"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_router_1 = __importDefault(require("./api/routes/api.router"));
const music_router_1 = __importDefault(require("./api/routes/music.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', api_router_1.default);
app.use('/api/music', music_router_1.default);
// app.all('*', (req: Request, res: Response) => {
//   res.status(404).send({ msg: 'incorrect path - path not found' })
// })
exports.default = app;
