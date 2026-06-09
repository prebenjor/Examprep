import { describe, expect, it } from 'vitest'
import { buildQuestionHistory, rankQuestions, selectSmartStudyQuestions } from './smartStudy'
import { defaultState } from './storage'
import type { AppState, Attempt, Question } from '../types'

const question = (id: string): Question => ({
  id,
  number: Number(id.replace(/\D/g, '')) || 1,
  category: 'Test',
  type: 'single',
  prompt: id,
  choices: [{ id: 'A', text: 'Correct' }, { id: 'B', text: 'Wrong' }],
  correctAnswers: ['A'],
  explanation: 'A',
})

const attempt = (
  id: string,
  questionId: string,
  selectedAnswers: string[],
  completedAt: string,
  marked = false,
): Attempt => ({
  id,
  mode: 'practice',
  startedAt: completedAt,
  completedAt,
  durationSeconds: 10,
  questionIds: [questionId],
  answers: [{ questionId, selectedAnswers }],
  markedQuestionIds: marked ? [questionId] : [],
  score: selectedAnswers[0] === 'A' ? 100 : 0,
  correct: selectedAnswers[0] === 'A' ? 1 : 0,
  incorrect: selectedAnswers.length && selectedAnswers[0] !== 'A' ? 1 : 0,
  unanswered: selectedAnswers.length ? 0 : 1,
})

const stateWith = (...attempts: Attempt[]): AppState => ({
  ...defaultState,
  attempts,
  completedQuestionIds: [...new Set(attempts.flatMap((item) => item.questionIds))],
})

describe('Smart Study ranking', () => {
  const now = Date.parse('2026-06-09T12:00:00.000Z')

  it('prioritizes latest incorrect, unanswered, unseen, then recently correct', () => {
    const bank = [question('incorrect'), question('unanswered'), question('unseen'), question('correct')]
    const state = stateWith(
      attempt('a1', 'incorrect', ['B'], '2026-06-09T10:00:00.000Z'),
      attempt('a2', 'unanswered', [], '2026-06-09T10:00:00.000Z'),
      attempt('a3', 'correct', ['A'], '2026-06-09T10:00:00.000Z'),
    )
    expect(rankQuestions(bank, state, now, () => 0.5).map(({ question: item }) => item.id))
      .toEqual(['incorrect', 'unanswered', 'unseen', 'correct'])
  })

  it('raises repeated misses and previously marked questions', () => {
    const item = question('q1')
    const state = stateWith(
      attempt('a1', 'q1', ['B'], '2026-06-01T10:00:00.000Z', true),
      attempt('a2', 'q1', ['B'], '2026-06-08T10:00:00.000Z', true),
    )
    const history = buildQuestionHistory(item, state, now)
    expect(history.incorrect).toBe(2)
    expect(history.markedForReview).toBe(true)
    expect(history.priorityReason).toContain('Missed 2 times')
    expect(history.priorityReason).toContain('marked for review')
  })

  it('clears the review boost after a newer unmarked attempt', () => {
    const item = question('q1')
    const history = buildQuestionHistory(
      item,
      stateWith(
        attempt('a1', 'q1', ['B'], '2026-06-01T10:00:00.000Z', true),
        attempt('a2', 'q1', ['A'], '2026-06-08T10:00:00.000Z'),
      ),
      now,
    )
    expect(history.markedForReview).toBe(false)
    expect(history.priorityReason).not.toContain('marked for review')
  })

  it('increases correct-question priority as it becomes stale', () => {
    const item = question('q1')
    const recent = buildQuestionHistory(
      item,
      stateWith(attempt('a1', 'q1', ['A'], '2026-06-08T12:00:00.000Z')),
      now,
    )
    const stale = buildQuestionHistory(
      item,
      stateWith(attempt('a2', 'q1', ['A'], '2026-05-01T12:00:00.000Z')),
      now,
    )
    expect(stale.priority).toBeGreaterThan(recent.priority)
    expect(stale.priorityReason).toContain('days ago')
  })

  it('selects 20 unique questions and handles smaller banks', () => {
    const bank = Array.from({ length: 25 }, (_, index) => question(`q${index + 1}`))
    const selected = selectSmartStudyQuestions(bank, defaultState, 20, now, () => 0.25)
    expect(selected).toHaveLength(20)
    expect(new Set(selected.map((item) => item.id))).toHaveLength(20)
    expect(selectSmartStudyQuestions(bank.slice(0, 5), defaultState, 20, now)).toHaveLength(5)
  })

  it('uses injected randomness to order equal-priority questions deterministically', () => {
    const bank = [question('q1'), question('q2'), question('q3')]
    const first = selectSmartStudyQuestions(bank, defaultState, 3, now, () => 0)
    const second = selectSmartStudyQuestions(bank, defaultState, 3, now, () => 0)
    expect(first.map((item) => item.id)).toEqual(second.map((item) => item.id))
  })
})
