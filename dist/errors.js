"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle404 = exports.handlePsql23503 = exports.handlePsql23502 = exports.handleCustomError = void 0;
const handleCustomError = (err, _req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.handleCustomError = handleCustomError;
const handlePsql23502 = (err, _req, res, next) => {
    if (err.code === "23502") {
        res.status(400).send({ msg: "bad request" });
    }
    else
        next(err);
};
exports.handlePsql23502 = handlePsql23502;
const handlePsql23503 = (err, _req, res, next) => {
    if (err.code === "23503") {
        res.status(404).send({ msg: "not found" });
    }
    else
        next(err);
};
exports.handlePsql23503 = handlePsql23503;
const handle404 = (_req, res) => {
    res.status(404).send({ msg: "incorrect path - path not found" });
};
exports.handle404 = handle404;
