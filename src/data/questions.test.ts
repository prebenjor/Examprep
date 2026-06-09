import { describe, expect, it } from 'vitest'
import { questions } from './questions'
import { getMatchPairs } from '../lib/quiz'

describe('question presentation data', () => {
  it('contains 192 text-first questions', () => {
    expect(questions).toHaveLength(192)
    expect(questions.every((question) => question.prompt.trim().length > 0)).toBe(true)
  })

  it('does not leave OCR fallback reveal buttons as answer choices', () => {
    const invalid = questions.filter(
      (question) =>
        getMatchPairs(question).length === 0 &&
        question.choices.some((choice) => choice.id === 'REVEAL'),
    )
    expect(invalid).toEqual([])
  })

  it('provides actual pairs for every matching question', () => {
    const invalid = questions.filter(
      (question) => question.type === 'matching' && getMatchPairs(question).length < 2,
    )
    expect(invalid).toEqual([])
  })
})
