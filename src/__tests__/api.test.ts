import request from 'supertest'
import app from '../app'
import { Music } from '../types/api'
import db from '.././db/postgres/connection'

afterAll(() => {
  db.end()
})

//import music data into seed function
beforeEach(() => {
  return seed()
})

describe('GET /api/music', () => {
  test('200: should return an array of object with all music', () => {
    return request(app)
      .get('/api/music')
      .expect(200)
      .then(({ body }) => {
        body.forEach((music: Music) => {
          expect(music).toHaveProperty('music_id')
          expect(music).toHaveProperty('spotify_id')
          expect(music).toHaveProperty('artists')
          expect(music).toHaveProperty('artist_id')
          expect(music).toHaveProperty('name')
          expect(music).toHaveProperty('type')
          expect(music).toHaveProperty('tracks')
          expect(music).toHaveProperty('genre')
          expect(music).toHaveProperty('preview')
          expect(music).toHaveProperty('listen_link')
          expect(music).toHaveProperty('release_date')
          expect(music).toHaveProperty('artwork')
        })
      })
  })
})
describe('GET /api/music?music_id', () => {
  test('200: should return a single object of music by music_id', () => {
    return request(app)
      .get('/api/music?music_id=1')
      .expect(200)
      .then(({ body }) => {
        expect(body.music_id).toBe(1)
      })
  })
})
describe('GET /api/music?artist_id', () => {
  test('200: should return an array of music object by artist_id for a particular artist', () => {
    return request(app)
      .get('/api/music?artist_id=2')
      .expect(200)
      .then(({ body }) => {
        body.forEach((music: Music) => {
          expect(music.artist_id).toBe(2)
        })
      })
  })
})
describe('GET /api/music?genre', () => {
  test('200: should return an array of music with the same genre', () => {
    return request(app)
      .get('/api/music?genre=rock')
      .expect(200)
      .then(({ body }) => {
        body.forEach((music: Music) => {
          expect(music.genre).toEqual(['rock'])
        })
      })
  })
  describe('GET /api/music?order', () => {
    test('200: should return an array of music ASC or DESC by release_date if no other query, DESC by default', () => {
      return request(app)
        .get('/api/music?order=ASC')
        .expect(200)
        .then(({ body }) => {
          expect(body[0].release_date).toBe('2024-01-01')
        })
    })
  })
  describe('GET /api/music?pagination', () => {
    test('200: should return an array of music paginated beyond the default limit of 40', () => {
      return request(app)
        .get('/api/music?p=2')
        .expect(200)
        .then(({ body }) => {
          expect(body[0].music_id).toBe(41)
        })
    })
  })
})
