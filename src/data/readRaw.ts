import {Database} from "bun:sqlite";
import type { Project } from "../types/projects"

const db = new Database("data/projects.sqlite");

export const data = async (): Promise<Project[]> => {
    return db.query(`SELECT * FROM projects`).all() as Project[]
}
