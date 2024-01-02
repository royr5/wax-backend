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
describe('/api/reviews', () => {
    describe('/api/reviews/:album_id', () => {
        describe('GET /api/reviews/:album_id', () => {
            it('200: should return an array of album objects', () => {
                return (0, supertest_1.default)(app_1.default).get("/api/reviews/:album_id").expect(200).then();
            });
        });
    });
});
