import { Command } from "commander"
import { creator } from "../utils/writers/creator"
import { readAll } from "../utils/readers/readAll"
import { getProjectById, getProjectByName } from "../utils/readers/finder"

export function cli(): void {
    const program = new Command()

    program
        .name("Invoice")
        .description("Manage your freelance projects elegantly")
        .version("0.0.0")

    program
        .command("new")
        .description("Create new project")
        .action(async () => {
            await creator()
        })

    program
        .command("list")
        .description("List all projects")
        .action(async () => {
            await readAll()
        })

    program
        .command("get")
        .description("Get a especific project")
        .option("-i --id <number>", "Search the project by ID")
        .option("-n --name <name>", "Get project by name")
        .action(async (options) => {

            // By name
            if (options.name) {
                const project = await getProjectByName(options.name)

                if (project) {
                    console.table(project)
                } else {
                    console.error("Project not found")
                }
            }

            // By id
            if (options.id) {
                const project = await getProjectById(Number(options.id))

                if (project) {
                    console.table(project)
                } else {
                    console.error("Project not found")
                }
            }
        })

    // TODO: Criar argumento para atualisar o status de um projeto, funcoes ja prontas no readUser.ts e editor.ts


    program.parse()
}