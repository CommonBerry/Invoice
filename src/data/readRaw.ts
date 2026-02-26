import {Database} from "bun:sqlite";
import type { Project } from "../types/projects"
import {join} from "node:path";

const DB_PATH = join(process.cwd(), "data", "database.sqlite");
const db = new Database(DB_PATH)


export const data = async (): Promise<Project[]> => {
    return db.query(`SELECT * FROM projects`).all() as Project[]
}
