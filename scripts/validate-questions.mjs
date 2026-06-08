import fs from 'node:fs'

const source = fs.readFileSync(new URL('../src/data/questions.ts', import.meta.url), 'utf8')
const questionBlocks = [...source.matchAll(/\{\n    id: '([^']+)',([\s\S]*?)\n  \},/g)]
const errors = []
const ids = new Set()

if (questionBlocks.length === 0) errors.push('No questions found.')

for (const [, id, block] of questionBlocks) {
  if (ids.has(id)) errors.push(`Duplicate question id: ${id}`)
  ids.add(id)
  for (const field of ['number:', 'category:', 'type:', 'prompt:', 'choices:', 'correctAnswers:', 'explanation:']) {
    if (!block.includes(field)) errors.push(`${id} is missing ${field.replace(':', '')}`)
  }
  const choiceSection = block.match(/choices: choices\(\{([\s\S]*?)\}\),/)
  const answerSection = block.match(/correctAnswers: \[([^\]]+)\]/)
  if (!choiceSection) errors.push(`${id} has no parseable choices`)
  if (!answerSection) errors.push(`${id} has no parseable correct answers`)
  if (choiceSection && answerSection) {
    const choiceIds = [...choiceSection[1].matchAll(/([A-Z]):/g)].map((match) => match[1])
    const answerIds = [...answerSection[1].matchAll(/'([^']+)'/g)].map((match) => match[1])
    for (const answer of answerIds) {
      if (!choiceIds.includes(answer)) errors.push(`${id} references missing choice ${answer}`)
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${questionBlocks.length} questions with unique IDs and valid answer references.`)
