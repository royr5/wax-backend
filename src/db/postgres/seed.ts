import db from "./connection";
import format from "pg-format";

export const seed = async (users: [], music: []) => {
	//? Drop tables if they exist
	await db.query(`DROP TABLE IF EXISTS users;`);
	await db.query(`DROP TABLE IF EXISTS music;`);

	//? Create tables
	await db.query(
		`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        screen_name VARCHAR NOT NULL,
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
        )`
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
};
