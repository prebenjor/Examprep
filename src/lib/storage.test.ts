import { beforeEach, describe, expect, it } from 'vitest'
import { clearState, defaultState, loadState, saveState } from './storage'

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
})
