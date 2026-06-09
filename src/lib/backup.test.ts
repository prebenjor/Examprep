import { describe, expect, it } from 'vitest'
import { createBackup, mergeStates, parseBackup } from './backup'
import { defaultState, STATE_VERSION } from './storage'
import type { AppState, Attempt } from '../types'

const attempt = (id: string, completedAt: string): Attempt => ({
  id,
  mode: 'smart',
  startedAt: completedAt,
  completedAt,
  durationSeconds: 10,
  questionIds: ['q1'],
  answers: [{ questionId: 'q1', selectedAnswers: ['A'] }],
  score: 100,
  correct: 1,
  incorrect: 0,
  unanswered: 0,
})

describe('progress backups', () => {
  it('creates and parses a versioned backup', () => {
    const backup = createBackup(
      { ...defaultState, bookmarks: ['q1'] },
      new Date('2026-06-09T12:00:00.000Z'),
    )
    expect(parseBackup(JSON.stringify(backup))).toEqual(backup)
    expect(backup.version).toBe(STATE_VERSION)
  })

  it('rejects malformed, unrelated, and unsupported backups', () => {
    expect(() => parseBackup('{bad')).toThrow('valid JSON')
    expect(() => parseBackup('{}')).toThrow('not an exam prep backup')
    expect(() => parseBackup(JSON.stringify({
      format: 'cmdb-exam-prep-backup',
      version: 99,
      state: {},
    }))).toThrow('not supported')
    expect(() => parseBackup(JSON.stringify({
      format: 'cmdb-exam-prep-backup',
      version: STATE_VERSION,
      state: { attempts: [{ id: 'broken' }] },
    }))).toThrow('malformed attempt data')
  })

  it('normalizes missing legacy state fields', () => {
    const parsed = parseBackup(JSON.stringify({
      format: 'cmdb-exam-prep-backup',
      version: STATE_VERSION,
      exportedAt: '2026-06-09T12:00:00.000Z',
      state: { attempts: [], bookmarks: ['q1'] },
    }))
    expect(parsed.state.completedQuestionIds).toEqual([])
    expect(parsed.state.passingScore).toBe(80)
  })

  it('merges unique progress, deduplicates attempts, and keeps newer preferences', () => {
    const local: AppState = {
      ...defaultState,
      updatedAt: '2026-06-01T00:00:00.000Z',
      preferencesUpdatedAt: '2026-06-01T00:00:00.000Z',
      attempts: [attempt('same', '2026-06-01T00:00:00.000Z')],
      bookmarks: ['q1'],
      completedQuestionIds: ['q1'],
      theme: 'light',
    }
    const imported: AppState = {
      ...defaultState,
      updatedAt: '2026-06-09T00:00:00.000Z',
      preferencesUpdatedAt: '2026-06-09T00:00:00.000Z',
      attempts: [
        attempt('same', '2026-06-01T00:00:00.000Z'),
        attempt('new', '2026-06-09T00:00:00.000Z'),
      ],
      bookmarks: ['q1', 'q2'],
      completedQuestionIds: ['q1', 'q2'],
      theme: 'dark',
    }
    const merged = mergeStates(local, imported)
    expect(merged.state.attempts.map((item) => item.id)).toEqual(['new', 'same'])
    expect(merged.state.bookmarks).toEqual(['q1', 'q2'])
    expect(merged.state.theme).toBe('dark')
    expect(merged.summary).toMatchObject({
      addedAttempts: 1,
      duplicateAttempts: 1,
      addedBookmarks: 1,
      addedCompletedQuestions: 1,
      preferencesFrom: 'import',
    })
  })
})
