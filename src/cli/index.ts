import { Command } from "commander"
import { creator } from "../utils/writers/creator"

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

    program.parse()
}