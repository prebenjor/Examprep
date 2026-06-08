import { describe, expect, it } from 'vitest'
import { isCorrect, scoreQuestions, shuffleQuestions } from './quiz'
import type { Question } from '../types'

const bank: Question[] = [
  {
    id: 'one',
    number: 1,
    category: 'Test',
    type: 'single',
    prompt: 'Single',
    choices: [{ id: 'A', text: 'A' }, { id: 'B', text: 'B' }],
    correctAnswers: ['A'],
    explanation: 'A',
  },
  {
    id: 'many',
    number: 2,
    category: 'Test',
    type: 'multiple',
    prompt: 'Multiple',
    choices: [{ id: 'A', text: 'A' }, { id: 'B', text: 'B' }, { id: 'C', text: 'C' }],
    correctAnswers: ['A', 'C'],
    explanation: 'A and C',
  },
  {
    id: 'match',
    number: 3,
    category: 'Test',
    type: 'matching',
    prompt: 'Matching',
    choices: [{ id: 'A', text: 'A' }, { id: 'B', text: 'B' }],
    correctAnswers: ['A', 'B'],
    explanation: 'Both',
  },
]

describe('quiz scoring', () => {
  it('scores exact single and multi-answer selections', () => {
    expect(isCorrect(bank[0], ['A'])).toBe(true)
    expect(isCorrect(bank[1], ['C', 'A'])).toBe(true)
  })

  it('does not award partial credit', () => {
    expect(isCorrect(bank[1], ['A'])).toBe(false)
    expect(isCorrect(bank[1], ['A', 'B', 'C'])).toBe(false)
  })

  it('tracks correct, incorrect, and unanswered independently', () => {
    expect(scoreQuestions(bank, [
      { questionId: 'one', selectedAnswers: ['A'] },
      { questionId: 'many', selectedAnswers: ['A'] },
      { questionId: 'match', selectedAnswers: [] },
    ])).toEqual({ correct: 1, incorrect: 1, unanswered: 1, score: 33 })
  })

  it('shuffles without losing or duplicating records', () => {
    const shuffled = shuffleQuestions(bank, () => 0)
    expect(shuffled.map((item) => item.id).sort()).toEqual(['many', 'match', 'one'])
    expect(new Set(shuffled.map((item) => item.id)).size).toBe(bank.length)
  })
})
