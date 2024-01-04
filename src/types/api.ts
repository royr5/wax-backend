export interface Music {
	music_id: string;
	artist_ids: string[];
	artists: string[];
	name: string;
	type: string;
	tracks: string[] | null;
	genre: string[] | null;
	preview: string;
	listen_link: string;
	release_date: string;
	artwork: string;
}

export interface CustomResponse extends Response {
	[key: string]: unknown;
}

export interface Review {
	music_id: number;
	user_id: number;
	score: number;
	title: string | null;
	body: string | null;
	created_at: string;
}
