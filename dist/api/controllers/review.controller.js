"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReview = exports.postReviewById = exports.getAllReviews = exports.getReviewsById = void 0;
const review_models_1 = require("../models/review.models");
const getReviewsById = async (req, res, next) => {
    const { music_id } = req.params;
    try {
        const reviews = await (0, review_models_1.selectReviews)(music_id);
        res.status(200).send({ reviews });
    }
    catch (err) {
        next(err);
    }
};
exports.getReviewsById = getReviewsById;
const getAllReviews = async (_req, res, next) => {
    try {
        const reviews = await (0, review_models_1.selectReviews)();
        res.status(200).send({ reviews });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllReviews = getAllReviews;
const postReviewById = async (req, res, next) => {
    try {
        const { body: { username, rating, review_title, review_body }, params: { music_id }, } = req;
        const review = await (0, review_models_1.insertReview)(music_id, username, rating, review_title, review_body);
        res.status(201).send({ review });
    }
    catch (err) {
        next(err);
    }
};
exports.postReviewById = postReviewById;
const removeReview = async (req, res, next) => {
    const { review_id } = req.params;
    try {
        await (0, review_models_1.deleteReview)(review_id);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.removeReview = removeReview;
