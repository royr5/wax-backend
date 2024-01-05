export interface Music {
  music_id: string
  artist_ids: string[]
  artist_names: string[]
  name: string
  type: string
  tracks: string[] | null
  album_id: string
  genres: string[] | null
  preview: string
  album_img: string
  release_date: string
}
export interface MusicQueries {
  music_id?: string
  artist_ids?: string
  genres?: string
  order?: 'ASC' | 'DESC'
  p?: string
}

export interface CustomResponse extends Response {
  [key: string]: unknown
}

export interface Review {
	music_id: number;
	screen_name: number;
	rating: number;
	review_title: string | null;
	review_body: string | null;
	created_at?: string;
}