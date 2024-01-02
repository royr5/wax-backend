import request from 'supertest';
import app from '../app';
import { CustomResponse } from '../types/api';
import db from '../../db/postgres/connection'


afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed();
});

describe('GET /api/music', () => {
  test('200: should return an array of object with all music', () => {
    return request(app)
      .get('/api/music')
      .expect(200)
      .then(({body}) => {
        expect(body.length).toHaveLength(musicData.length)
        
      });
  });
});
