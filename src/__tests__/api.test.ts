import request from "supertest";
import app from "../app";
import { Review } from "../types/api";

describe("", () => {
	test("should ", () => {});
});

describe("/api/reviews", () => {
	
	describe("/api/reviews/:music_id", () => {
		describe("GET /api/reviews/:music_id", () => {
			it("200: should return an array of music objects", () => {
				return request(app)
					.get("/api/reviews/1")
					.expect(200)
					.then((response: unknown) => {
						const { body } = response as { body: Review[] };

						body.forEach((review: any) => {
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
