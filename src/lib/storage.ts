import type { AppState } from '../types'

const STORAGE_KEY = 'cmdb-exam-prep-state-v1'
export const PASSING_SCORE = 80
export const STATE_VERSION = 2

export const defaultState: AppState = {
  version: STATE_VERSION,
  updatedAt: new Date(0).toISOString(),
  preferencesUpdatedAt: new Date(0).toISOString(),
  attempts: [],
  bookmarks: [],
  completedQuestionIds: [],
  theme: 'light',
  passingScore: PASSING_SCORE,
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return normalizeState(JSON.parse(raw))
  } catch {
    return defaultState
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function normalizeState(value: unknown): AppState {
  const parsed = value && typeof value === 'object' ? value as Partial<AppState> : {}
  return {
    version: STATE_VERSION,
    updatedAt: isIsoDate(parsed.updatedAt) ? parsed.updatedAt : new Date(0).toISOString(),
    preferencesUpdatedAt: isIsoDate(parsed.preferencesUpdatedAt)
      ? parsed.preferencesUpdatedAt
      : isIsoDate(parsed.updatedAt)
        ? parsed.updatedAt
        : new Date(0).toISOString(),
    attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
    bookmarks: stringArray(parsed.bookmarks),
    completedQuestionIds: stringArray(parsed.completedQuestionIds),
    theme: parsed.theme === 'dark' ? 'dark' : 'light',
    passingScore: PASSING_SCORE,
  }
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}
