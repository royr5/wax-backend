export interface CustomResponse {
    [key: string]: unknown
}

export interface Music {
    id: number
    spotify_id: number
    artist: string
    artist_id: number
    name: string
    type: string
    tracks: string[]
    genre: string[]
    preview: string
    listen_link: string
    release_date: string
}