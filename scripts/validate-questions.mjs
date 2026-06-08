import fs from 'node:fs'

const structuredSource = fs.readFileSync(new URL('../src/data/questions.ts', import.meta.url), 'utf8')
const generatedSource = fs.readFileSync(new URL('../src/data/screenshotQuestions.ts', import.meta.url), 'utf8')
const structuredBlocks = [...structuredSource.matchAll(/\{\n    id: '([^']+)',([\s\S]*?)\n  \},/g)]
const generatedQuestions = JSON.parse(generatedSource.slice(generatedSource.indexOf('= [') + 2))
const errors = []
const ids = new Set()

if (structuredBlocks.length + generatedQuestions.length !== 192) {
  errors.push(`Expected 192 questions, found ${structuredBlocks.length + generatedQuestions.length}.`)
}

for (const [, id, block] of structuredBlocks) {
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

for (const question of generatedQuestions) {
  if (ids.has(question.id)) errors.push(`Duplicate question id: ${question.id}`)
  ids.add(question.id)
  for (const field of ['number', 'category', 'type', 'prompt', 'choices', 'correctAnswers', 'explanation']) {
    if (!question[field] && question[field] !== 0) errors.push(`${question.id} is missing ${field}`)
  }
  const choiceIds = new Set(question.choices.map((choice) => choice.id))
  if (choiceIds.size !== question.choices.length) errors.push(`${question.id} has duplicate choice IDs`)
  if (question.choices.some((choice) => !choice.text.trim())) errors.push(`${question.id} has an empty choice`)
  for (const answer of question.correctAnswers) {
    if (!choiceIds.has(answer)) errors.push(`${question.id} references missing choice ${answer}`)
  }
  if (question.image) {
    const imagePath = new URL(`../public/${question.image}`, import.meta.url)
    if (!fs.existsSync(imagePath)) errors.push(`${question.id} references missing image ${question.image}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${ids.size} questions with unique IDs, valid answers, and source images.`)
