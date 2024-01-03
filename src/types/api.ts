export interface CustomResponse {
    [key: string]: unknown
}

export interface Music {
    music_id: string
    spotify_id: string
    artists: string[]
    artist_id: string
    name: string
    type: string
    tracks: string[]
    genre: string[]
    preview: string
    listen_link: string
    release_date: string
    artwork: string
}

export interface MusicQueries {
    music_id?: string
    artist_id?: string
    genre?: string
    order?: 'ASC' | 'DESC'
    p?: string
}