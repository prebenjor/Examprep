import type { AppState } from '../types'

const STORAGE_KEY = 'cmdb-exam-prep-state-v1'
export const PASSING_SCORE = 80

export const defaultState: AppState = {
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
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      ...defaultState,
      ...parsed,
      passingScore: PASSING_SCORE,
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
      completedQuestionIds: Array.isArray(parsed.completedQuestionIds)
        ? parsed.completedQuestionIds
        : [],
    }
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
