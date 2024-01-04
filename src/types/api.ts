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
