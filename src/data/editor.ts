import type { Project } from '../types/projects'
import db from './database'

export function updaterCompleted(id: number, completed: boolean): void {
  const query = db.prepare(`
        UPDATE projects
        set projectCompleted = $completed
        WHERE id = $id
    `)

  query.run({
    $id: id,
    $completed: completed ? 1 : 0,
  })
}

export function updaterStarted(id: number, started: boolean): void {
  const query = db.prepare(`
        UPDATE projects
        set projectStarted = $started
        WHERE id = $id
    `)

  query.run({
    $id: id,
    $started: started ? 1 : 0,
  })
}

export const updateProject = (id: number, fields: Partial<Project>) => {
  const keys = Object.keys(fields)
  const values = Object.values(fields)

  const setClause = keys.map((k) => `${k} = ?`).join(', ')
  const query = `UPDATE projects SET ${setClause} WHERE id = ?`

  db.run(query, [...values, id])
}
