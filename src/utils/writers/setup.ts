import { homedir } from 'node:os'
import { genericConfirm, readUserForInit } from '../../cli/readUser'

export const setup = async (): Promise<[boolean, Error | null]> => {
  const configPath = `${homedir()}/.invoicerc`
  const file = Bun.file(configPath)

  if (await file.exists()) {
    const data = await genericConfirm('There is already a configuration file, rewrite it?', false)
    if (!data) {
      return [false, null]
    }
  }

  const data = await readUserForInit()
  try {
    await Bun.write(configPath, JSON.stringify(data, null, 2))
    return [true, null]
  } catch (error) {
    return [false, error as Error]
  }
}
