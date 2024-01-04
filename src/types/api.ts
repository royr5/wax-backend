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
