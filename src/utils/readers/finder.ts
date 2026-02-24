import { data } from "../../data/readRaw"

export async function getProjectById (id: number) {
    try {
        const project = await data()
        const getProject = project.find((p) => p.id === id)
        return getProject || null
    } catch (err) {
        console.error(`ERROR: ${err}`)
    }
}

export async function getProjectByName (name: string) {
    try {
        const project = await data()
        const getProject = project.find((p) => p.name === name)
        return getProject || null
    } catch (err) {
        console.error(`ERROR: ${err}`)
    }
}