import type { AttemptAnswer, Question } from '../types'

export function isCorrect(question: Question, selected: string[]): boolean {
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

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}
