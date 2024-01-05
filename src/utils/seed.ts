import * as fs from "fs/promises";
import testData from "../db/postgres/data/test-data.json";
import { faker } from "@faker-js/faker";

const formatMusicResponse = async () => {
	const unformatted = await fs.readFile(
		`${__dirname}/db/postgres/test-data/music.json`,
		"utf-8"
	);

	const formatted = JSON.parse(unformatted);

	const output = formatted.tracks.items.map((song: any) => {
		return {
			preview: song.track.preview_url,
			type: song.track.album.album_type,
			name: song.track.name,
			music_id: song.track.id,
			artists: song.track.artists,
			album_id: song.track.album.id,
			album_images: song.track.album.images[0],
			album_name: song.track.album.name,
			release_date: song.track.album.release_date,
		};
	});

	await fs.writeFile(
		`${__dirname}/db/postgres/test-data/formatted-music.json`,
		JSON.stringify(output)
	);
};

// formatMusicResponse();

const addGenres = async () => {
	const formatted = testData.music.map((song) => {
		return {
			...song,
			genres: [faker.music.genre()],
		};
	});

	const output = {
		users: testData.users,
		reviews: testData.reviews,
		music: formatted,
	};

	await fs.writeFile(
		`${__dirname}/../db/postgres/data/test-data.json`,
		JSON.stringify(output)
	);
};

// addGenres();
