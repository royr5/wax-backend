"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.default = customError;
