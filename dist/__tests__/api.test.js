"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("", () => {
    test("should ", () => { });
});
describe("/api/reviews", () => {
    xdescribe("/api/reviews/:music_id", () => {
        describe("GET /api/reviews/:music_id", () => {
            it("200: should return an array of music objects", () => {
                return (0, supertest_1.default)(app_1.default)
                    .get("/api/reviews/1")
                    .expect(200)
                    .then((response) => {
                    const { body } = response;
                    body.forEach((review) => {
                        expect(review).toMatchObject({
                            music_id: 1,
                            user_id: expect.any("number"),
                            score: expect.any("number"),
                            title: expect.any("string" || null),
                            body: expect.any("string" || null),
                            created_at: expect.any("string"),
                        });
                    });
                });
            });
        });
    });
});
