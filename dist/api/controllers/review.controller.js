"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllReviews = exports.getReviewsById = void 0;
const getReviewsById = async (req, res, next) => {
    const { music_id } = req.params;
    try {
        //  TODO
        //? const reviews = await selectReviews(music_id);
        // res.status(200).send({ reviews });
        res.status(200).send({
            reviews: [
                {
                    music_id: 1,
                    user_id: 2,
                    score: 2,
                    title: "string",
                    body: "string",
                    created_at: "string",
                },
            ],
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getReviewsById = getReviewsById;
const getAllReviews = async (req, res, next) => {
    try {
        //  TODO
        //? const reviews = await selectReviews();
        // res.status(200).send({ reviews });
        res.status(200).send({
            reviews: [
                {
                    music_id: 1,
                    user_id: 2,
                    score: 2,
                    title: "string",
                    body: "string",
                    created_at: "string",
                },
            ],
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAllReviews = getAllReviews;
