import { data } from "../../data/readRaw"

export async function readAll() {
    // Depois usar cli table3 ou algo do tipo, para nao exibir o index
    console.table(await data(), ["id", "name", "description"])
}