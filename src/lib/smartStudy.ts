import { isCorrect, shuffleQuestions } from './quiz'
import type { AppState, Question, QuestionHistory } from '../types'

const DAY_MS = 24 * 60 * 60 * 1000
type StudyResult = QuestionHistory['latestResult']

export function buildQuestionHistory(
  question: Question,
  state: AppState,
  now = Date.now(),
): QuestionHistory {
  const records = state.attempts
    .filter((attempt) => attempt.questionIds.includes(question.id))
    .map((attempt) => {
      const selected = attempt.answers.find((answer) => answer.questionId === question.id)?.selectedAnswers ?? []
      const result: StudyResult = selected.length === 0
        ? 'unanswered'
        : isCorrect(question, selected)
          ? 'correct'
          : 'incorrect'
      return {
        completedAt: attempt.completedAt,
        result,
        marked: attempt.markedQuestionIds?.includes(question.id) ?? false,
        incorrectlySubmitted: attempt.incorrectlySubmittedQuestionIds?.includes(question.id) ?? false,
      }
    })
    .sort((left, right) => Date.parse(right.completedAt) - Date.parse(left.completedAt))

  const correct = records.filter((record) => record.result === 'correct').length
  const incorrect = records.filter((record) => record.result === 'incorrect').length
  const correctedMisses = records.filter(
    (record) => record.result === 'correct' && record.incorrectlySubmitted,
  ).length
  const historicalMisses = incorrect + correctedMisses
  const unanswered = records.filter((record) => record.result === 'unanswered').length
  const latest = records[0]
  const latestResult = latest?.result ?? 'unseen'
  const markedForReview = latest?.marked ?? false
  const daysSince = latest
    ? Math.max(0, Math.floor((now - Date.parse(latest.completedAt)) / DAY_MS))
    : 0

  let priority = 400
  let priorityReason = 'Not studied yet'

  if (latestResult === 'incorrect') {
    priority = 1000 + Math.min(incorrect * 35, 210) + Math.min(daysSince, 30)
    priorityReason = incorrect > 1 ? `Missed ${incorrect} times` : 'Last answer was incorrect'
  } else if (latestResult === 'unanswered') {
    priority = 850 + Math.min(unanswered * 25, 125) + Math.min(daysSince, 30)
    priorityReason = 'Left unanswered'
  } else if (latestResult === 'correct') {
    if (historicalMisses > 0) {
      priority = 700 + Math.min(historicalMisses * 35, 210) + Math.min(daysSince * 4, 120)
      priorityReason = historicalMisses > 1
        ? `Corrected after ${historicalMisses} previous misses`
        : 'Corrected after a previous miss'
    } else {
      priority = 100 + Math.min(daysSince * 8, 240)
      priorityReason = daysSince >= 14 ? `Last studied ${daysSince} days ago` : 'Recently answered correctly'
    }
  }

  if (markedForReview) {
    priority += 380
    priorityReason = `${priorityReason}; previously marked for review`
  }

  return {
    questionId: question.id,
    attempts: records.length,
    correct,
    incorrect,
    unanswered,
    accuracy: records.length ? Math.round((correct / records.length) * 100) : 0,
    lastAttemptedAt: latest?.completedAt ?? null,
    latestResult,
    markedForReview,
    priority,
    priorityReason,
  }
}

export function rankQuestions(
  bank: Question[],
  state: AppState,
  now = Date.now(),
  random = Math.random,
): Array<{ question: Question; history: QuestionHistory }> {
  const randomized = shuffleQuestions(bank, random)
  return randomized
    .map((question) => ({ question, history: buildQuestionHistory(question, state, now) }))
    .sort((left, right) => right.history.priority - left.history.priority)
}

export function selectSmartStudyQuestions(
  bank: Question[],
  state: AppState,
  size = 20,
  now = Date.now(),
  random = Math.random,
): Question[] {
  return rankQuestions(bank, state, now, random)
    .slice(0, Math.min(size, bank.length))
    .map(({ question }) => question)
}
