import { users, music } from './../data/test-data.json'
import { seed } from './seed'
import db from '../connection'

export default async () => {
  try {
    await seed(users as [], music as [])

    db.end
  } catch (e) {
    throw new Error()
  }
}
