"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle404 = exports.customError = void 0;
const customError = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.customError = customError;
const handle404 = (req, res) => {
    res.status(404).send({ msg: 'incorrect path - path not found' });
};
exports.handle404 = handle404;
