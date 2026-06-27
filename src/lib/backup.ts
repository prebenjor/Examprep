import { normalizeState, STATE_VERSION } from './storage'
import type { AppState, Attempt, ImportSummary, ProgressBackup } from '../types'

const BACKUP_FORMAT = 'cmdb-exam-prep-backup'

export function createBackup(state: AppState, now = new Date()): ProgressBackup {
  return {
    format: BACKUP_FORMAT,
    version: STATE_VERSION,
    exportedAt: now.toISOString(),
    state: { ...state, version: STATE_VERSION },
  }
}

export function parseBackup(text: string): ProgressBackup {
  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    throw new Error('This file is not valid JSON.')
  }

  if (!value || typeof value !== 'object') throw new Error('This is not an exam prep backup.')
  const backup = value as Partial<ProgressBackup>
  if (backup.format !== BACKUP_FORMAT) throw new Error('This is not an exam prep backup.')
  if (backup.version !== STATE_VERSION) throw new Error(`Backup version ${String(backup.version)} is not supported.`)
  if (!backup.state || typeof backup.state !== 'object') throw new Error('The backup does not contain progress data.')
  const state = backup.state as Partial<AppState>
  if (state.attempts !== undefined && (!Array.isArray(state.attempts) || !state.attempts.every(isAttempt))) {
    throw new Error('The backup contains malformed attempt data.')
  }
  if (state.bookmarks !== undefined && !isStringArray(state.bookmarks)) {
    throw new Error('The backup contains malformed bookmark data.')
  }
  if (state.completedQuestionIds !== undefined && !isStringArray(state.completedQuestionIds)) {
    throw new Error('The backup contains malformed completion data.')
  }

  return {
    format: BACKUP_FORMAT,
    version: STATE_VERSION,
    exportedAt: typeof backup.exportedAt === 'string' ? backup.exportedAt : new Date(0).toISOString(),
    state: normalizeState(backup.state),
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isAttempt(value: unknown): value is Attempt {
  if (!value || typeof value !== 'object') return false
  const attempt = value as Partial<Attempt>
  return typeof attempt.id === 'string' &&
    ['practice', 'exam', 'smart'].includes(attempt.mode ?? '') &&
    isIsoDate(attempt.startedAt) &&
    isIsoDate(attempt.completedAt) &&
    isFiniteNumber(attempt.durationSeconds) &&
    isStringArray(attempt.questionIds) &&
    Array.isArray(attempt.answers) &&
    attempt.answers.every((answer) =>
      answer && typeof answer === 'object' &&
      typeof answer.questionId === 'string' &&
      isStringArray(answer.selectedAnswers),
    ) &&
    (attempt.markedQuestionIds === undefined || isStringArray(attempt.markedQuestionIds)) &&
    (attempt.incorrectlySubmittedQuestionIds === undefined || isStringArray(attempt.incorrectlySubmittedQuestionIds)) &&
    isFiniteNumber(attempt.score) &&
    isFiniteNumber(attempt.correct) &&
    isFiniteNumber(attempt.incorrect) &&
    isFiniteNumber(attempt.unanswered)
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function mergeStates(
  local: AppState,
  imported: AppState,
): { state: AppState; summary: ImportSummary } {
  const localAttemptIds = new Set(local.attempts.map((attempt) => attempt.id))
  const addedAttempts = imported.attempts.filter((attempt) => !localAttemptIds.has(attempt.id))
  const attempts = [...local.attempts, ...addedAttempts]
    .sort((left, right) => Date.parse(right.completedAt) - Date.parse(left.completedAt))
  const bookmarks = [...new Set([...local.bookmarks, ...imported.bookmarks])]
  const completedQuestionIds = [...new Set([
    ...local.completedQuestionIds,
    ...imported.completedQuestionIds,
  ])]
  const importIsNewer =
    Date.parse(imported.preferencesUpdatedAt) > Date.parse(local.preferencesUpdatedAt)

  return {
    state: {
      version: STATE_VERSION,
      updatedAt: new Date().toISOString(),
      preferencesUpdatedAt: importIsNewer
        ? imported.preferencesUpdatedAt
        : local.preferencesUpdatedAt,
      attempts,
      bookmarks,
      completedQuestionIds,
      theme: importIsNewer ? imported.theme : local.theme,
      passingScore: local.passingScore,
    },
    summary: {
      addedAttempts: addedAttempts.length,
      duplicateAttempts: imported.attempts.length - addedAttempts.length,
      addedBookmarks: bookmarks.length - local.bookmarks.length,
      addedCompletedQuestions: completedQuestionIds.length - local.completedQuestionIds.length,
      preferencesFrom: importIsNewer ? 'import' : 'local',
    },
  }
}
