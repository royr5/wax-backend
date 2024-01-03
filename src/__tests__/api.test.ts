import request from 'supertest';
import app from '../app';
import { Music } from '../types/api';
import db from '.././db/postgres/connection'


afterAll(() => {
  db.end();
});


//import music data into seed function
beforeEach(() => {
  return seed();
});

describe('GET /api/music', () => {
  test('200: should return an array of object with all music', () => {
    return request(app)
      .get('/api/music')
      .expect(200)
      .then(({body}) => {
        body.forEach((music: Music)=>{
          expect(music).toHaveProperty('id')
          expect(music).toHaveProperty('spotify_id')
          expect(music).toHaveProperty('artist')
          expect(music).toHaveProperty('artist_id')
          expect(music).toHaveProperty('name')
          expect(music).toHaveProperty('type')
          expect(music).toHaveProperty('tracks')
          expect(music).toHaveProperty('genre')
          expect(music).toHaveProperty('preview')
          expect(music).toHaveProperty('listen_link')
          expect(music).toHaveProperty('release_date')
        })
      });
  });
  describe('GET /api/music?music_id', () => { 
    test('200: should return a single object of music by music_id', () => {
      
    });
  })
  describe('GET /api/music?artist_id', () => {
    test('200: should return an array of music object by artist_id for a particular artist', () => {
      
    });
  });
  describe('GET /api/music?genre', () => {
    test('200: should return an array of music with the same genre', () => {
      
    });
  });
  describe('GET /api/music?order', () => {
    test('200: should return an array of music ASC or DESC, DESC by default', () => {
      
    });
  });
  describe('GET /api/music?pagination', () => {
    test('200: should return an array of music paginated beyond the default limit', () => {
      
    });
  });
});
