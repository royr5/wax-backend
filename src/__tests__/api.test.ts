import request from "supertest";
import app from "../app";
import { Review } from "../types/api";

describe("/api/reviews", () => {
  describe("GET /api/reviews", () => {
    it("200: should return an array of review objects", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response: unknown) => {
          const { body } = response as { body: { reviews: Review[] } };

          body.reviews.forEach((review: any) => {
            expect(review).toMatchObject({
              music_id: expect.any(Number),
              user_id: expect.any(Number),
              score: expect.any(Number),
              title: expect.any(String || null),
              body: expect.any(String || null),
              created_at: expect.any(String),
            });
          });
        });
    });
  });
  describe("/api/reviews/:music_id", () => {
    describe("GET /api/reviews/:music_id", () => {
      it("200: should return an array of review objects with passed music_id", () => {
        return request(app)
          .get("/api/reviews/1")
          .expect(200)
          .then((response: unknown) => {
            const { body } = response as { body: { reviews: Review[] } };

            body.reviews.forEach((review: any) => {
              expect(review).toMatchObject({
                music_id: 1,
                user_id: expect.any(Number),
                score: expect.any(Number),
                title: expect.any(String || null),
                body: expect.any(String || null),
                created_at: expect.any(String),
              });
            });
          });
      });
    });
  });
});
