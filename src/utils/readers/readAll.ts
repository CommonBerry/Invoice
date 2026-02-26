import { data } from "../../data/readRaw"

export async function readAll() {
    // Depois usar cli table3 ou algo do tipo, para nao exibir o index
    // TODO WARN: Verificar se o data e vasio, e se for, retornar erro
    console.table(await data(), ["id", "name", "description"])
}