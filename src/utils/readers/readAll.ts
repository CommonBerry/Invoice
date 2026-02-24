import { data } from "../../data/readRaw"

async function readAll() {
    console.table(await data())
}