import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { questions } from './data/questions'
import { formatDuration, isCorrect, scoreQuestions, shuffleQuestions } from './lib/quiz'
import { clearState, loadState, saveState } from './lib/storage'
import type { AppState, Attempt, AttemptAnswer, Question } from './types'

type Screen = 'dashboard' | 'practice' | 'setup' | 'exam' | 'results'

interface Session {
  mode: 'practice' | 'exam'
  questions: Question[]
  answers: Record<string, string[]>
  index: number
  startedAt: number
  secondsLeft: number | null
  submitted: string[]
}

const initialSession = (mode: Session['mode'], sessionQuestions: Question[], timer: number | null): Session => ({
  mode,
  questions: sessionQuestions,
  answers: {},
  index: 0,
  startedAt: Date.now(),
  secondsLeft: timer,
  submitted: [],
})

function App() {
  const [state, setState] = useState<AppState>(() => loadState())
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [session, setSession] = useState<Session | null>(null)
  const [result, setResult] = useState<Attempt | null>(null)
  const [examSize, setExamSize] = useState(questions.length)
  const [timed, setTimed] = useState(true)
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'unanswered'>('all')

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme
    saveState(state)
  }, [state])

  const stats = useMemo(() => {
    const totalCorrect = state.attempts.reduce((sum, attempt) => sum + attempt.correct, 0)
    const totalQuestions = state.attempts.reduce((sum, attempt) => sum + attempt.questionIds.length, 0)
    return {
      accuracy: totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      completed: new Set(state.completedQuestionIds).size,
    }
  }, [state])

  const updateState = (updater: (current: AppState) => AppState) => setState((current) => updater(current))

  const startPractice = (retryIncorrect = false) => {
    let selected = questions
    if (retryIncorrect && state.attempts.length) {
      const wrongIds = new Set(
        state.attempts.flatMap((attempt) =>
          attempt.answers
            .filter((answer) => {
              const question = questions.find((item) => item.id === answer.questionId)
              return question && !isCorrect(question, answer.selectedAnswers)
            })
            .map((answer) => answer.questionId),
        ),
      )
      selected = questions.filter((question) => wrongIds.has(question.id))
    }
    setSession(initialSession('practice', selected.length ? selected : questions, null))
    setScreen('practice')
  }

  const startExam = () => {
    const selected = shuffleQuestions(questions).slice(0, Math.min(examSize, questions.length))
    setSession(initialSession('exam', selected, timed ? selected.length * 90 : null))
    setScreen('exam')
  }

  const toggleAnswer = (question: Question, choiceId: string) => {
    if (!session || session.submitted.includes(question.id)) return
    setSession((current) => {
      if (!current) return current
      const existing = current.answers[question.id] ?? []
      const next =
        question.type === 'single' || question.type === 'image'
          ? [choiceId]
          : existing.includes(choiceId)
            ? existing.filter((id) => id !== choiceId)
            : [...existing, choiceId]
      return { ...current, answers: { ...current.answers, [question.id]: next } }
    })
  }

  const submitPracticeAnswer = () => {
    if (!session) return
    const question = session.questions[session.index]
    if (!(session.answers[question.id]?.length > 0)) return
    setSession({ ...session, submitted: [...session.submitted, question.id] })
  }

  const toggleBookmark = (questionId: string) => {
    updateState((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(questionId)
        ? current.bookmarks.filter((id) => id !== questionId)
        : [...current.bookmarks, questionId],
    }))
  }

  const finishSession = useCallback(() => {
    if (!session) return
    const answerList: AttemptAnswer[] = session.questions.map((question) => ({
      questionId: question.id,
      selectedAnswers: session.answers[question.id] ?? [],
    }))
    const scored = scoreQuestions(session.questions, answerList)
    const now = Date.now()
    const attempt: Attempt = {
      id: crypto.randomUUID(),
      mode: session.mode,
      startedAt: new Date(session.startedAt).toISOString(),
      completedAt: new Date(now).toISOString(),
      durationSeconds: Math.max(0, Math.round((now - session.startedAt) / 1000)),
      questionIds: session.questions.map((question) => question.id),
      answers: answerList,
      ...scored,
    }
    setState((current) => ({
      ...current,
      attempts: [attempt, ...current.attempts].slice(0, 30),
      completedQuestionIds: [
        ...new Set([...current.completedQuestionIds, ...attempt.questionIds]),
      ],
    }))
    setResult(attempt)
    setReviewFilter('all')
    setScreen('results')
  }, [session])

  useEffect(() => {
    if (screen !== 'exam' || !session || session.secondsLeft === null) return
    const timerId = window.setTimeout(() => {
      if (session.secondsLeft === 1) {
        finishSession()
      } else {
        setSession((current) =>
          current && current.secondsLeft !== null
            ? { ...current, secondsLeft: current.secondsLeft - 1 }
            : current,
        )
      }
    }, 1000)
    return () => window.clearTimeout(timerId)
  }, [finishSession, screen, session])

  const goHome = () => {
    setSession(null)
    setResult(null)
    setScreen('dashboard')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={goHome} aria-label="CMDB Prep home">
          <span className="brand-mark">C</span>
          <span><strong>CMDB Prep</strong><small>Practice with purpose</small></span>
        </button>
        <nav aria-label="Main navigation">
          <button className={screen === 'dashboard' ? 'active' : ''} onClick={goHome}>Dashboard</button>
          <button onClick={() => startPractice()}>Practice</button>
          <button onClick={() => setScreen('setup')}>Mock exam</button>
        </nav>
        <button
          className="icon-button"
          onClick={() => updateState((current) => ({ ...current, theme: current.theme === 'light' ? 'dark' : 'light' }))}
          aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {state.theme === 'light' ? 'Moon' : 'Sun'}
        </button>
      </header>

      <main>
        {screen === 'dashboard' && (
          <Dashboard
            state={state}
            accuracy={stats.accuracy}
            completed={stats.completed}
            onPractice={() => startPractice()}
            onExam={() => setScreen('setup')}
            onRetry={() => startPractice(true)}
            onReset={() => {
              clearState()
              setState({ attempts: [], bookmarks: [], completedQuestionIds: [], theme: state.theme, passingScore: 70 })
            }}
          />
        )}
        {screen === 'setup' && (
          <ExamSetup
            size={examSize}
            timed={timed}
            onSize={setExamSize}
            onTimed={setTimed}
            onStart={startExam}
            onCancel={goHome}
          />
        )}
        {(screen === 'practice' || screen === 'exam') && session && (
          <QuizScreen
            session={session}
            bookmarks={state.bookmarks}
            onAnswer={toggleAnswer}
            onBookmark={toggleBookmark}
            onSubmit={submitPracticeAnswer}
            onNavigate={(index) => setSession({ ...session, index })}
            onFinish={finishSession}
            onExit={goHome}
          />
        )}
        {screen === 'results' && result && (
          <Results
            attempt={result}
            passingScore={state.passingScore}
            filter={reviewFilter}
            onFilter={setReviewFilter}
            onHome={goHome}
            onRetry={() => startPractice(true)}
          />
        )}
      </main>
      <footer>Unofficial study aid based on personal CMDB/CSDM notes. Passing score is an app setting, not an official exam rule.</footer>
    </div>
  )
}

function Dashboard({
  state,
  accuracy,
  completed,
  onPractice,
  onExam,
  onRetry,
  onReset,
}: {
  state: AppState
  accuracy: number
  completed: number
  onPractice: () => void
  onExam: () => void
  onRetry: () => void
  onReset: () => void
}) {
  return (
    <div className="page dashboard">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">CMDB / CSDM CERTIFICATION PREP</span>
          <h1>Turn your notes into exam confidence.</h1>
          <p>Practice a verified question bank, learn from explanations, and track what needs another pass.</p>
          <div className="button-row">
            <button className="primary" onClick={onPractice}>Start practice</button>
            <button className="secondary" onClick={onExam}>Take a mock exam</button>
          </div>
        </div>
        <div className="readiness">
          <span>Current accuracy</span>
          <strong>{accuracy}%</strong>
          <div className="progress-track"><span style={{ width: `${accuracy}%` }} /></div>
          <small>{state.attempts.length ? `${state.attempts.length} completed attempt${state.attempts.length === 1 ? '' : 's'}` : 'Complete your first session to set a baseline.'}</small>
        </div>
      </section>

      <section className="metric-grid" aria-label="Study statistics">
        <article><span className="metric-icon purple">Q</span><div><strong>{questions.length}</strong><small>Verified questions</small></div></article>
        <article><span className="metric-icon green">✓</span><div><strong>{completed}</strong><small>Questions completed</small></div></article>
        <article><span className="metric-icon orange">%</span><div><strong>{accuracy}%</strong><small>Overall accuracy</small></div></article>
        <article><span className="metric-icon blue">★</span><div><strong>{state.bookmarks.length}</strong><small>Bookmarked</small></div></article>
      </section>

      <section className="content-grid">
        <div>
          <div className="section-heading"><div><span className="eyebrow">CHOOSE YOUR MODE</span><h2>How do you want to study?</h2></div></div>
          <div className="mode-grid">
            <button className="mode-card" onClick={onPractice}>
              <span className="mode-art practice-art">01</span>
              <span><strong>Practice mode</strong><small>Immediate feedback and explanations after every answer.</small></span>
              <b>Begin practice →</b>
            </button>
            <button className="mode-card" onClick={onExam}>
              <span className="mode-art exam-art">60</span>
              <span><strong>Mock exam</strong><small>Randomized questions with optional timing and deferred results.</small></span>
              <b>Configure exam →</b>
            </button>
            <button className="mode-card" onClick={onRetry}>
              <span className="mode-art retry-art">↻</span>
              <span><strong>Review mistakes</strong><small>Focus a new practice session on questions answered incorrectly.</small></span>
              <b>Retry incorrect →</b>
            </button>
          </div>
        </div>
        <aside className="history-card">
          <div className="section-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h2>Your attempts</h2></div></div>
          {state.attempts.length === 0 ? (
            <div className="empty-state"><strong>No attempts yet</strong><small>Your latest scores will appear here.</small></div>
          ) : state.attempts.slice(0, 5).map((attempt) => (
            <div className="attempt-row" key={attempt.id}>
              <span className={`score-dot ${attempt.score >= state.passingScore ? 'pass' : 'fail'}`}>{attempt.score}%</span>
              <div><strong>{attempt.mode === 'exam' ? 'Mock exam' : 'Practice'}</strong><small>{new Date(attempt.completedAt).toLocaleDateString()} · {attempt.questionIds.length} questions</small></div>
            </div>
          ))}
          {state.attempts.length > 0 && <button className="text-button danger" onClick={onReset}>Reset local progress</button>}
        </aside>
      </section>
    </div>
  )
}

function ExamSetup({ size, timed, onSize, onTimed, onStart, onCancel }: {
  size: number
  timed: boolean
  onSize: (size: number) => void
  onTimed: (timed: boolean) => void
  onStart: () => void
  onCancel: () => void
}) {
  const sizes = [10, 25, 50, 60, questions.length].filter((value, index, list) => value <= questions.length && list.indexOf(value) === index)
  return (
    <div className="page narrow-page">
      <button className="back-button" onClick={onCancel}>← Dashboard</button>
      <section className="setup-card">
        <span className="eyebrow">MOCK EXAM</span>
        <h1>Build your session</h1>
        <p>Answers and explanations stay hidden until you submit the exam.</p>
        <fieldset>
          <legend>Number of questions</legend>
          <div className="choice-pills">
            {sizes.map((option) => <button className={size === option ? 'selected' : ''} onClick={() => onSize(option)} key={option}>{option === questions.length ? `All (${option})` : option}</button>)}
          </div>
        </fieldset>
        <label className="toggle-row"><span><strong>Timed exam</strong><small>Allow 90 seconds per question.</small></span><input type="checkbox" checked={timed} onChange={(event) => onTimed(event.target.checked)} /></label>
        <div className="setup-summary"><span>Questions <strong>{Math.min(size, questions.length)}</strong></span><span>Time <strong>{timed ? `${Math.ceil(Math.min(size, questions.length) * 1.5)} min` : 'Unlimited'}</strong></span><span>Pass mark <strong>70%</strong></span></div>
        <button className="primary wide" onClick={onStart}>Start mock exam</button>
      </section>
    </div>
  )
}

function QuizScreen({ session, bookmarks, onAnswer, onBookmark, onSubmit, onNavigate, onFinish, onExit }: {
  session: Session
  bookmarks: string[]
  onAnswer: (question: Question, choiceId: string) => void
  onBookmark: (id: string) => void
  onSubmit: () => void
  onNavigate: (index: number) => void
  onFinish: () => void
  onExit: () => void
}) {
  const question = session.questions[session.index]
  const selected = session.answers[question.id] ?? []
  const submitted = session.submitted.includes(question.id)
  const correct = submitted && isCorrect(question, selected)
  return (
    <div className="quiz-layout">
      <aside className="question-nav">
        <div><span className="eyebrow">{session.mode === 'exam' ? 'MOCK EXAM' : 'PRACTICE'}</span><strong>{session.index + 1} / {session.questions.length}</strong></div>
        <div className="question-grid">
          {session.questions.map((item, index) => (
            <button key={item.id} className={`${index === session.index ? 'current' : ''} ${(session.answers[item.id]?.length ?? 0) > 0 ? 'answered' : ''}`} onClick={() => onNavigate(index)}>{index + 1}</button>
          ))}
        </div>
        <button className="text-button" onClick={onExit}>Exit session</button>
      </aside>
      <section className="question-stage">
        <div className="quiz-status">
          <span>{question.category}</span>
          {session.secondsLeft !== null && <strong className={session.secondsLeft < 60 ? 'time-warning' : ''}>{formatDuration(session.secondsLeft)}</strong>}
          <button className={`bookmark ${bookmarks.includes(question.id) ? 'saved' : ''}`} onClick={() => onBookmark(question.id)}>{bookmarks.includes(question.id) ? '★ Saved' : '☆ Bookmark'}</button>
        </div>
        <article className="question-card">
          <div className="question-meta"><span>QUESTION {question.number}</span><span>{question.type === 'multiple' ? 'Select all that apply' : question.type === 'matching' ? 'Matching set' : 'Select one answer'}</span></div>
          <h1>{question.prompt}</h1>
          {question.needsReview && <div className="review-note">Source note: this item contains wording or answer ambiguity and is preserved for review.</div>}
          <div className="answers">
            {question.choices.map((choice) => {
              const chosen = selected.includes(choice.id)
              const revealCorrect = submitted && question.correctAnswers.includes(choice.id)
              const revealWrong = submitted && chosen && !question.correctAnswers.includes(choice.id)
              return (
                <button
                  key={choice.id}
                  className={`${chosen ? 'chosen' : ''} ${revealCorrect ? 'correct' : ''} ${revealWrong ? 'wrong' : ''}`}
                  onClick={() => onAnswer(question, choice.id)}
                  disabled={submitted}
                >
                  <span className="choice-letter">{choice.id}</span><span>{choice.text}</span>
                  {revealCorrect && <b>✓</b>}{revealWrong && <b>×</b>}
                </button>
              )
            })}
          </div>
          {submitted && (
            <div className={`feedback ${correct ? 'good' : 'bad'}`}>
              <strong>{correct ? 'Correct' : 'Not quite'}</strong>
              <p>{question.explanation}</p>
            </div>
          )}
        </article>
        <div className="quiz-actions">
          <button className="secondary" disabled={session.index === 0} onClick={() => onNavigate(session.index - 1)}>Previous</button>
          <div>
            {session.mode === 'practice' && !submitted && <button className="primary" disabled={!selected.length} onClick={onSubmit}>Check answer</button>}
            {session.index < session.questions.length - 1 ? (
              <button className={submitted || session.mode === 'exam' ? 'primary' : 'secondary'} onClick={() => onNavigate(session.index + 1)}>Next</button>
            ) : <button className="primary" onClick={onFinish}>Finish {session.mode === 'exam' ? 'exam' : 'practice'}</button>}
          </div>
        </div>
      </section>
    </div>
  )
}

function Results({ attempt, passingScore, filter, onFilter, onHome, onRetry }: {
  attempt: Attempt
  passingScore: number
  filter: 'all' | 'incorrect' | 'unanswered'
  onFilter: (value: 'all' | 'incorrect' | 'unanswered') => void
  onHome: () => void
  onRetry: () => void
}) {
  const answerMap = new Map(attempt.answers.map((answer) => [answer.questionId, answer.selectedAnswers]))
  const attemptedQuestions = attempt.questionIds.map((id) => questions.find((question) => question.id === id)).filter(Boolean) as Question[]
  const categoryStats = Object.entries(attemptedQuestions.reduce<Record<string, { correct: number; total: number }>>((acc, question) => {
    const item = acc[question.category] ?? { correct: 0, total: 0 }
    item.total += 1
    if (isCorrect(question, answerMap.get(question.id) ?? [])) item.correct += 1
    acc[question.category] = item
    return acc
  }, {}))
  const visible = attemptedQuestions.filter((question) => {
    const selected = answerMap.get(question.id) ?? []
    if (filter === 'unanswered') return selected.length === 0
    if (filter === 'incorrect') return selected.length > 0 && !isCorrect(question, selected)
    return true
  })
  return (
    <div className="page results-page">
      <section className="result-hero">
        <div className={`score-ring ${attempt.score >= passingScore ? 'passed' : 'failed'}`}><strong>{attempt.score}%</strong><small>{attempt.score >= passingScore ? 'PASS' : 'KEEP GOING'}</small></div>
        <div><span className="eyebrow">SESSION COMPLETE</span><h1>{attempt.score >= passingScore ? 'Strong result.' : 'You found the next topics to review.'}</h1><p>{attempt.correct} correct out of {attempt.questionIds.length} questions in {formatDuration(attempt.durationSeconds)}.</p><div className="button-row"><button className="primary" onClick={onRetry}>Review mistakes</button><button className="secondary" onClick={onHome}>Dashboard</button></div></div>
      </section>
      <section className="result-metrics">
        <article><strong>{attempt.correct}</strong><small>Correct</small></article>
        <article><strong>{attempt.incorrect}</strong><small>Incorrect</small></article>
        <article><strong>{attempt.unanswered}</strong><small>Unanswered</small></article>
        <article><strong>{formatDuration(attempt.durationSeconds)}</strong><small>Time taken</small></article>
      </section>
      <section className="category-card"><h2>Performance by category</h2>{categoryStats.map(([category, value]) => <div className="category-row" key={category}><span>{category}</span><div className="progress-track"><span style={{ width: `${Math.round(value.correct / value.total * 100)}%` }} /></div><strong>{value.correct}/{value.total}</strong></div>)}</section>
      <section className="review-section">
        <div className="section-heading"><div><span className="eyebrow">ANSWER REVIEW</span><h2>Question breakdown</h2></div><div className="filter-row">{(['all', 'incorrect', 'unanswered'] as const).map((value) => <button className={filter === value ? 'active' : ''} onClick={() => onFilter(value)} key={value}>{value}</button>)}</div></div>
        {visible.map((question) => {
          const selected = answerMap.get(question.id) ?? []
          const correct = isCorrect(question, selected)
          return <article className="review-item" key={question.id}><span className={`review-status ${selected.length === 0 ? 'blank' : correct ? 'right' : 'miss'}`}>{selected.length === 0 ? '—' : correct ? '✓' : '×'}</span><div><strong>Question {question.number}: {question.prompt}</strong><p>Your answer: {selected.length ? selected.map((id) => question.choices.find((choice) => choice.id === id)?.text).join('; ') : 'Unanswered'}</p>{!correct && <p className="correct-answer">Correct: {question.correctAnswers.map((id) => question.choices.find((choice) => choice.id === id)?.text).join('; ')}</p>}<small>{question.explanation}</small></div></article>
        })}
        {!visible.length && <div className="empty-state"><strong>No questions in this filter</strong></div>}
      </section>
    </div>
  )
}

export default App
