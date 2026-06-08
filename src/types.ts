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
  mode: 'practice' | 'exam'
  startedAt: string
  completedAt: string
  durationSeconds: number
  questionIds: string[]
  answers: AttemptAnswer[]
  score: number
  correct: number
  incorrect: number
  unanswered: number
}

export interface AppState {
  attempts: Attempt[]
  bookmarks: string[]
  completedQuestionIds: string[]
  theme: 'light' | 'dark'
  passingScore: number
}
