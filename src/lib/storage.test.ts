import { beforeEach, describe, expect, it } from 'vitest'
import { clearState, defaultState, loadState, PASSING_SCORE, saveState } from './storage'

describe('local storage', () => {
  beforeEach(() => localStorage.clear())

  it('returns defaults when storage is empty or malformed', () => {
    expect(loadState()).toEqual(defaultState)
    localStorage.setItem('cmdb-exam-prep-state-v1', '{bad json')
    expect(loadState()).toEqual(defaultState)
  })

  it('round-trips progress and clears it', () => {
    const state = { ...defaultState, bookmarks: ['cmdb-001'], completedQuestionIds: ['cmdb-001'] }
    saveState(state)
    expect(loadState().bookmarks).toEqual(['cmdb-001'])
    clearState()
    expect(loadState()).toEqual(defaultState)
  })

  it('uses and migrates to the 80 percent pass mark', () => {
    expect(PASSING_SCORE).toBe(80)
    localStorage.setItem(
      'cmdb-exam-prep-state-v1',
      JSON.stringify({ ...defaultState, passingScore: 70 }),
    )
    expect(loadState().passingScore).toBe(80)
    expect(loadState().version).toBe(2)
    expect(loadState().updatedAt).toBe(new Date(0).toISOString())
    expect(loadState().preferencesUpdatedAt).toBe(new Date(0).toISOString())
  })
})
