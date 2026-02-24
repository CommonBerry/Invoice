import { readUserForCreate } from "../../cli/readUser"
import { initDB, saveProject } from "../../data/database.ts";
import * as p from '@clack/prompts'
import pc from 'picocolors'

export async function creator() {
   const data = await readUserForCreate()

    // Database
    initDB()

    saveProject(data)

    p.outro(pc.green('Project completed successfully!'))
}
