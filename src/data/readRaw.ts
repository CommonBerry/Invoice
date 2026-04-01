import { join } from 'node:path'
import { homedir } from 'node:os'
import type { Project } from '../types/projects'
import { prepareDB } from './database'

const DB_DIR = join(homedir(), '.local', 'share', 'invoice', 'db')
const DB_PATH = join(DB_DIR, 'projects.sqlite')
const db = prepareDB(DB_DIR, DB_PATH)

export const data = async (): Promise<Project[]> => {
  return db.query(`SELECT * FROM projects`).all() as Project[]
}
