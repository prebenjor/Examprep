export type QuestionType = 'single' | 'multiple' | 'matching' | 'image'

export interface Choice {
  id: string
  text: string
}

export interface MatchPair {
  id: string
  item: string
  target: string
}

export interface Question {
  id: string
  number: number
  category: string
  type: QuestionType
  prompt: string
  choices: Choice[]
  correctAnswers: string[]
  explanation: string
  matchPairs?: MatchPair[]
  image?: string
  needsReview?: boolean
}

export interface AttemptAnswer {
  questionId: string
  selectedAnswers: string[]
}

export interface Attempt {
  id: string
  mode: 'practice' | 'exam' | 'smart'
  startedAt: string
  completedAt: string
  durationSeconds: number
  questionIds: string[]
  answers: AttemptAnswer[]
  markedQuestionIds?: string[]
  incorrectlySubmittedQuestionIds?: string[]
  score: number
  correct: number
  incorrect: number
  unanswered: number
}

export interface AppState {
  version: number
  updatedAt: string
  preferencesUpdatedAt: string
  attempts: Attempt[]
  bookmarks: string[]
  completedQuestionIds: string[]
  theme: 'light' | 'dark'
  passingScore: number
}

export interface ProgressBackup {
  format: 'cmdb-exam-prep-backup'
  version: number
  exportedAt: string
  state: AppState
}

export interface ImportSummary {
  addedAttempts: number
  duplicateAttempts: number
  addedBookmarks: number
  addedCompletedQuestions: number
  preferencesFrom: 'local' | 'import'
}

export interface QuestionHistory {
  questionId: string
  attempts: number
  correct: number
  incorrect: number
  unanswered: number
  accuracy: number
  lastAttemptedAt: string | null
  latestResult: 'correct' | 'incorrect' | 'unanswered' | 'unseen'
  markedForReview: boolean
  priority: number
  priorityReason: string
}
