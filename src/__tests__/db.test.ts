import pgDb from '../db/postgres/connection'
import { seed } from '../db/postgres/seed/seed'
import { users, music } from '../db/postgres/data/test-data.json'

beforeAll(async () => {
  await seed(users as [], music as [])
})

afterAll(async () => {
  await pgDb.end()
})

describe('postgres', () => {
  it('should contain all users', async () => {
    const { rows } = await pgDb.query(`SELECT * FROM users;`)
    expect(rows).toMatchObject(users)
  })
  it('should contain all music', async () => {
    const { rows } = await pgDb.query(`SELECT * FROM music;`)
    rows.forEach((row) => {
      expect(row).toMatchObject({
        music_id: expect.any(String),
        artist_ids: expect.any(Array),
        artist_names: expect.any(Array),
        name: expect.any(String),
        type: expect.any(String),
        album_id: expect.any(String),
        release_date: expect.any(Date),
      })
      expect(String(row.genres)).toMatch(/\[.*\]|null/i)
      expect(String(row.tracks)).toMatch(/\[.*\]|null/i)
      expect(String(row.album_img)).toMatch(/\w|null/i)
      expect(String(row.preview)).toMatch(/\w|null/i)
    })
  })
})
