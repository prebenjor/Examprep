import { describe, expect, it } from 'vitest'
import { buildPracticeOrder, buildStudyOverview, filterQuestions, normalizeSearch } from './studyViews'
import { defaultState } from './storage'
import type { AppState, Attempt, Question } from '../types'

const bank: Question[] = [
  {
    id: 'q1', number: 1, category: 'CMDB', type: 'single', prompt: 'What is a CI?',
    choices: [{ id: 'A', text: 'Configuration item' }, { id: 'B', text: 'Change item' }],
    correctAnswers: ['A'], explanation: 'A',
  },
  {
    id: 'q2', number: 2, category: 'CSDM', type: 'multiple', prompt: 'Select service types',
    choices: [{ id: 'A', text: 'Application service' }, { id: 'B', text: 'Business service' }],
    correctAnswers: ['A', 'B'], explanation: 'Both', needsReview: true,
  },
]

const attempt: Attempt = {
  id: 'a1', mode: 'practice', startedAt: '2026-06-01T00:00:00.000Z',
  completedAt: '2026-06-01T00:01:00.000Z', durationSeconds: 60,
  questionIds: ['q1'], answers: [{ questionId: 'q1', selectedAnswers: ['B'] }],
  score: 0, correct: 0, incorrect: 1, unanswered: 0,
}

const state: AppState = { ...defaultState, attempts: [attempt], bookmarks: ['q2'] }

describe('study views', () => {
  it('normalizes search terms', () => {
    expect(normalizeSearch('  APPLICATION   Service ')).toBe('application service')
  })

  it('filters by text, category, type, and state', () => {
    expect(filterQuestions(bank, state, { search: 'configuration', category: 'all', type: 'all', status: 'all' }))
      .toHaveLength(1)
    expect(filterQuestions(bank, state, { search: '', category: 'CSDM', type: 'multiple', status: 'bookmarked' }))
      .toHaveLength(1)
    expect(filterQuestions(bank, state, { search: '', category: 'all', type: 'all', status: 'incorrect' })[0].question.id)
      .toBe('q1')
    expect(filterQuestions(bank, state, { search: '', category: 'all', type: 'all', status: 'source-review' })[0].question.id)
      .toBe('q2')
  })

  it('starts practice with the selected question without duplicates', () => {
    expect(buildPracticeOrder(bank[1], bank).map((question) => question.id)).toEqual(['q2', 'q1'])
  })

  it('builds totals and category mastery from latest answers', () => {
    const overview = buildStudyOverview(bank, state)
    expect(overview.totalAnswers).toBe(1)
    expect(overview.attemptedQuestions).toBe(1)
    expect(overview.weakQuestions).toBe(1)
    expect(overview.categoryMastery.find((item) => item.category === 'CMDB')).toMatchObject({
      attempted: 1,
      correct: 0,
      total: 1,
      percent: 0,
    })
  })
})
