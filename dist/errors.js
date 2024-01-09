"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServerErrors = exports.handle404 = exports.handlePsqlErrors = exports.handleCustomError = void 0;
const handleCustomError = (err, _req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.handleCustomError = handleCustomError;
const handlePsqlErrors = (err, _req, res, next) => {
    switch (err.code) {
        case "22P02":
        case "23502":
            res.status(400).send({ msg: "bad request" });
            break;
        case "23503":
            res.status(404).send({ msg: "not found" });
            break;
        default:
            next(err);
            break;
    }
};
exports.handlePsqlErrors = handlePsqlErrors;
const handle404 = (_req, res) => {
    res.status(404).send({ msg: "incorrect path - path not found" });
};
exports.handle404 = handle404;
const handleServerErrors = (err, _req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "internal server error" });
};
exports.handleServerErrors = handleServerErrors;
