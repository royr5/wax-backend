import pgDb from "../db/postgres/connection";
import { seed } from "../db/postgres/seed/seed";
import { users, music, reviews } from "../db/postgres/data/test-data.json";

beforeAll(async () => {
	await seed(users as [], music as [], reviews as []);
});

afterAll(async () => {
	await pgDb.end();
});

describe("postgres", () => {
	it("should contain all users", async () => {
		const { rows } = await pgDb.query(`SELECT * FROM users;`);
		expect(rows).toMatchObject(users);
	});
	it("should contain all music", async () => {
		const { rows } = await pgDb.query(`SELECT * FROM music;`);
		rows.forEach((row) => {
			expect(row).toMatchObject({
				music_id: expect.any(String),
				artist_ids: expect.any(Array),
				artist_names: expect.any(Array),
				name: expect.any(String),
				type: expect.any(String),
				album_id: expect.any(String),
				release_date: expect.any(Date),
			});
			row.genres !== null &&
				row.genres.forEach((genre: string[]) => {
					expect(typeof genre).toBe("string");
				});
			row.tracks !== null &&
				row.tracks.forEach((track: string[]) => {
					expect(typeof track).toBe("string");
				});
			row.album_img !== null &&
				expect(typeof row.album_img).toBe("string");
			row.preview !== null && expect(typeof row.preview).toBe("string");
		});
	});
	it("should contain all reviews", async () => {
		const { rows } = await pgDb.query(`SELECT * FROM reviews;`);
		expect(rows).toMatchObject({
			review_id: expect.any(String),
			screen_name: expect.any(String),
			music_id: expect.any(String),
			rating: expect.any(Number),
			review_title: expect.any(String),
			review_body: expect.any(String),
		});
	})
});
