import { data } from "../../data/readRaw"

export async function readAll() {
    console.table(await data())
}