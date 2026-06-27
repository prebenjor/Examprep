import type { AttemptAnswer, MatchPair, Question } from '../types'

export function getMatchPairs(question: Question): MatchPair[] {
  if (question.type !== 'matching') return []
  if (question.matchPairs?.length) return question.matchPairs

  const sourceAnswer = question.explanation.replace(/^Source answer:\s*/i, '').replace(/\.$/, '')
  const entries = sourceAnswer.split(';').map((entry) => entry.trim()).filter(Boolean)
  if (entries.length < 2 || entries.some((entry) => !entry.includes(':'))) return []

  return entries.map((entry, index) => {
    const separator = entry.indexOf(':')
    return {
      id: `M${index + 1}`,
      item: entry.slice(0, separator).trim(),
      target: entry.slice(separator + 1).trim(),
    }
  })
}

export function isCorrect(question: Question, selected: string[]): boolean {
  const matchPairs = getMatchPairs(question)
  if (matchPairs.length) {
    const expected = matchPairs.map((pair) => `${pair.id}=${pair.id}`).sort()
    const actual = [...selected].sort()
    return expected.length === actual.length &&
      expected.every((answer, index) => answer === actual[index])
  }
  if (selected.length !== question.correctAnswers.length) return false
  const expected = [...question.correctAnswers].sort()
  const actual = [...selected].sort()
  return expected.every((answer, index) => answer === actual[index])
}

export function scoreQuestions(
  questions: Question[],
  answers: AttemptAnswer[],
) {
  const answerMap = new Map(
    answers.map((answer) => [answer.questionId, answer.selectedAnswers]),
  )
  let correct = 0
  let unanswered = 0

  questions.forEach((question) => {
    const selected = answerMap.get(question.id) ?? []
    if (selected.length === 0) unanswered += 1
    else if (isCorrect(question, selected)) correct += 1
  })

  const incorrect = questions.length - correct - unanswered
  const score =
    questions.length === 0 ? 0 : Math.round((correct / questions.length) * 100)

  return { correct, incorrect, unanswered, score }
}

export function shuffleQuestions<T>(items: T[], random = Math.random): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    ;[copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]]
  }
  return copy
}

export function shuffleAnswerChoices(question: Question, random = Math.random): Question {
  if (question.type === 'matching') return question
  return { ...question, choices: shuffleQuestions(question.choices, random) }
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}
