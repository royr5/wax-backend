import db from "../connection";
import format from "pg-format";

export const seed = async (users: [], music: [], reviews: []) => {
	//? Drop tables if they exist
	await db.query(`DROP TABLE IF EXISTS reviews`);
	await db.query(`DROP TABLE IF EXISTS music;`);
	await db.query(`DROP TABLE IF EXISTS users;`);

	//? Create tables
	await db.query(
		`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        screen_name VARCHAR UNIQUE NOT NULL,
        avatar_url VARCHAR DEFAULT NULL,
        bio VARCHAR DEFAULT NULL
        );`
	);
	await db.query(
		`CREATE TABLE music (
        music_id VARCHAR PRIMARY KEY,
        artist_ids text ARRAY NOT NULL,
        artist_names text ARRAY NOT NULL,
        name VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        tracks text ARRAY DEFAULT NULL,
        album_id VARCHAR DEFAULT NULL,
        genres text ARRAY DEFAULT NULL,
        preview VARCHAR DEFAULT NULL,
        album_img VARCHAR DEFAULT NULL,
        release_date DATE NOT NULL
        );`
	);
	await db.query(
		`CREATE TABLE reviews (
		review_id SERIAL PRIMARY KEY,
		screen_name VARCHAR REFERENCES users(screen_name),
		music_id VARCHAR REFERENCES music(music_id),
		rating INTEGER NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		review_title VARCHAR DEFAULT NULL,
		review_body VARCHAR DEFAULT NULL
		);`
		);

	//? Insert data
	const formattedUsers = format(
		`
        INSERT INTO users (screen_name, avatar_url, bio)
        VALUES
        %L;`,
		users.map(
			(user: {
				screen_name: string;
				avatar_url: string;
				bio: string;
			}) => [user.screen_name, user.avatar_url, user.bio]
		)
	);
	await db.query(formattedUsers);

	const formattedMusic = format(
		`
        INSERT INTO music (music_id, artist_ids, artist_names, name, type, tracks, album_id, genres, preview, album_img, release_date)
        VALUES
        %L;`,
		music.map(
			(item: {
				music_id: string;
				artists: {
					id: string;
					name: string;
				}[];
				name: string;
				type: string;
				tracks: string[];
				album_id: string;
				genres: string[];
				preview: string;
				album_images: { url: string };
				release_date: string;
			}) => [
				item.music_id,
				`{${item.artists.map((artist) => `${artist.id}`)}}`,
				`{${item.artists.map((artist) => `${artist.name}`)}}`,
				item.name,
				item.type,
				item.tracks,
				item.album_id,
				item.genres,
				item.preview,
				item.album_images.url,
				item.release_date,
			]
		)
	);
  await db.query(formattedMusic);
  
  const formattedReviews = format(
    `INSERT INTO reviews (screen_name, music_id, rating, review_title, review_body)
    VALUES
    %L;`,
    reviews.map(
      (review: {
        screen_name: string;
        music_id: string;
        rating: number;
        review_title: string;
        review_body: string;
      }) => [
        review.screen_name,
        review.music_id,
        review.rating,
        review.review_title,
        review.review_body,
      ]
    )
  )
  await db.query(formattedReviews);
};
