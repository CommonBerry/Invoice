import * as p from '@clack/prompts'
import pc from 'picocolors'
import db from '../../data/database'

export async function deleteProject(id: number) {
  const project = db.prepare('SELECT id FROM projects WHERE id = ?').get(id)

  if (!project) {
    console.error('Invalid ID: Project not found.')
    process.exit(1)
  }

  // Prompt
  p.intro(pc.yellow('INVOICE CLI - Delete Project'))
  const prompt = await p.confirm({
    message: `Are you sure you want to delete the project with id ${id}?`,
    initialValue: false,
  })

  if (p.isCancel(prompt) || prompt === false) {
    p.cancel('Operation canceled')
    process.exit(0)
  } else {
    p.outro(pc.green('Project deleted successfully!'))
  }

  const deleteQuery = db.prepare('DELETE FROM projects WHERE id = ?')

  const result = deleteQuery.run(id)

  return result.changes
}
