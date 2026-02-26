import db from "../../data/database"

export function updaterCompleted(id: number, completed: boolean): void {
    const query = db.prepare(`
        UPDATE projects
        set project_completed = $completed
        WHERE id = $id
    `)

    query.run({
        $id: id,
        $completed: completed ? 1 : 0
    })
}