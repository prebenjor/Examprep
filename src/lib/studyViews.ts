import { buildQuestionHistory } from './smartStudy'
import { isCorrect } from './quiz'
import type { AppState, Question, QuestionHistory, QuestionType } from '../types'

export type BrowseStatus = 'all' | 'bookmarked' | 'weak' | 'unseen' | 'incorrect' | 'source-review'

export interface BrowseFilters {
  search: string
  category: string
  type: QuestionType | 'all'
  status: BrowseStatus
}

export interface CategoryMastery {
  category: string
  correct: number
  attempted: number
  total: number
  percent: number
}

export interface StudyOverview {
  totalAnswers: number
  totalCorrect: number
  accuracy: number
  attemptedQuestions: number
  dueQuestions: number
  weakQuestions: number
  categoryMastery: CategoryMastery[]
}

export const defaultBrowseFilters: BrowseFilters = {
  search: '',
  category: 'all',
  type: 'all',
  status: 'all',
}

export function normalizeSearch(value: string): string {
  return value.toLocaleLowerCase().replace(/\s+/g, ' ').trim()
}

export function filterQuestions(
  bank: Question[],
  state: AppState,
  filters: BrowseFilters,
  now = Date.now(),
): Array<{ question: Question; history: QuestionHistory }> {
  const query = normalizeSearch(filters.search)
  return bank
    .map((question) => ({ question, history: buildQuestionHistory(question, state, now) }))
    .filter(({ question, history }) => {
      const matchesText = !query || normalizeSearch([
        question.prompt,
        question.category,
        ...question.choices.map((choice) => choice.text),
      ].join(' ')).includes(query)
      const matchesCategory = filters.category === 'all' || question.category === filters.category
      const matchesType = filters.type === 'all' || question.type === filters.type
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'bookmarked' && state.bookmarks.includes(question.id)) ||
        (filters.status === 'weak' && history.priority >= 850) ||
        (filters.status === 'unseen' && history.latestResult === 'unseen') ||
        (filters.status === 'incorrect' && history.latestResult === 'incorrect') ||
        (filters.status === 'source-review' && Boolean(question.needsReview))
      return matchesText && matchesCategory && matchesType && matchesStatus
    })
}

export function buildPracticeOrder(selected: Question, filtered: Question[]): Question[] {
  return [selected, ...filtered.filter((question) => question.id !== selected.id)]
}

export function buildStudyOverview(
  bank: Question[],
  state: AppState,
  now = Date.now(),
): StudyOverview {
  const histories = bank.map((question) => buildQuestionHistory(question, state, now))
  const totalAnswers = state.attempts.reduce((sum, attempt) => sum + attempt.questionIds.length, 0)
  const totalCorrect = state.attempts.reduce((sum, attempt) => sum + attempt.correct, 0)
  const categoryMastery = [...new Set(bank.map((question) => question.category))]
    .map((category) => {
      const categoryQuestions = bank.filter((question) => question.category === category)
      let attempted = 0
      let correct = 0
      categoryQuestions.forEach((question) => {
        const latestAttempt = state.attempts
          .filter((attempt) => attempt.questionIds.includes(question.id))
          .sort((left, right) => Date.parse(right.completedAt) - Date.parse(left.completedAt))[0]
        if (!latestAttempt) return
        attempted += 1
        const selected = latestAttempt.answers.find((answer) => answer.questionId === question.id)?.selectedAnswers ?? []
        if (isCorrect(question, selected)) correct += 1
      })
      return {
        category,
        correct,
        attempted,
        total: categoryQuestions.length,
        percent: categoryQuestions.length ? Math.round((correct / categoryQuestions.length) * 100) : 0,
      }
    })
    .sort((left, right) => left.percent - right.percent || left.category.localeCompare(right.category))

  return {
    totalAnswers,
    totalCorrect,
    accuracy: totalAnswers ? Math.round((totalCorrect / totalAnswers) * 100) : 0,
    attemptedQuestions: histories.filter((history) => history.attempts > 0).length,
    dueQuestions: histories.filter((history) => history.priority >= 400).length,
    weakQuestions: histories.filter((history) => history.priority >= 850).length,
    categoryMastery,
  }
}
