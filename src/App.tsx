import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { questions } from './data/questions'
import { formatDuration, getMatchPairs, isCorrect, scoreQuestions, shuffleQuestions } from './lib/quiz'
import { clearState, loadState, PASSING_SCORE, saveState } from './lib/storage'
import type { AppState, Attempt, AttemptAnswer, Question } from './types'

type Screen = 'dashboard' | 'practice' | 'setup' | 'exam' | 'session-review' | 'results'

interface Session {
  mode: 'practice' | 'exam'
  questions: Question[]
  answers: Record<string, string[]>
  index: number
  startedAt: number
  secondsLeft: number | null
  submitted: string[]
  markedForReview: string[]
}

const initialSession = (mode: Session['mode'], sessionQuestions: Question[], timer: number | null): Session => ({
  mode,
  questions: sessionQuestions,
  answers: {},
  index: 0,
  startedAt: Date.now(),
  secondsLeft: timer,
  submitted: [],
  markedForReview: [],
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

  const setQuestionAnswers = (question: Question, answers: string[]) => {
    if (!session || session.submitted.includes(question.id)) return
    setSession((current) =>
      current
        ? { ...current, answers: { ...current.answers, [question.id]: answers } }
        : current,
    )
  }

  const submitPracticeAnswer = () => {
    if (!session) return
    const question = session.questions[session.index]
    if (!(session.answers[question.id]?.length > 0)) return
    setSession({ ...session, submitted: [...session.submitted, question.id] })
  }

  const changePracticeAnswer = (questionId: string) => {
    setSession((current) =>
      current
        ? {
            ...current,
            submitted: current.submitted.filter((id) => id !== questionId),
          }
        : current,
    )
  }

  const toggleMarkedForReview = (questionId: string) => {
    setSession((current) => {
      if (!current) return current
      const markedForReview = current.markedForReview.includes(questionId)
        ? current.markedForReview.filter((id) => id !== questionId)
        : [...current.markedForReview, questionId]
      return { ...current, markedForReview }
    })
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
      markedQuestionIds: session.markedForReview,
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
    if ((screen !== 'exam' && screen !== 'session-review') || !session || session.secondsLeft === null) return
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
              setState({ attempts: [], bookmarks: [], completedQuestionIds: [], theme: state.theme, passingScore: PASSING_SCORE })
            }}
          />
        )}
        {screen === 'setup' && (
          <ExamSetup
            size={examSize}
            timed={timed}
            onSize={setExamSize}
            onTimed={setTimed}
            passingScore={state.passingScore}
            onStart={startExam}
            onCancel={goHome}
          />
        )}
        {(screen === 'practice' || screen === 'exam') && session && (
          <QuizScreen
            session={session}
            bookmarks={state.bookmarks}
            onAnswer={toggleAnswer}
            onSetAnswers={setQuestionAnswers}
            onBookmark={toggleBookmark}
            onToggleReview={toggleMarkedForReview}
            onSubmit={submitPracticeAnswer}
            onChangeAnswer={changePracticeAnswer}
            onNavigate={(index) => setSession({ ...session, index })}
            onFinish={() => setScreen('session-review')}
            onExit={goHome}
          />
        )}
        {screen === 'session-review' && session && (
          <SessionReview
            session={session}
            onBack={() => setScreen(session.mode === 'exam' ? 'exam' : 'practice')}
            onQuestion={(index) => {
              setSession({ ...session, index })
              setScreen(session.mode === 'exam' ? 'exam' : 'practice')
            }}
            onSubmit={finishSession}
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
      <footer>Unofficial study aid based on personal CMDB/CSDM notes. The app pass mark is 80%, not an official exam rule.</footer>
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

function ExamSetup({ size, timed, passingScore, onSize, onTimed, onStart, onCancel }: {
  size: number
  timed: boolean
  passingScore: number
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
        <div className="setup-summary"><span>Questions <strong>{Math.min(size, questions.length)}</strong></span><span>Time <strong>{timed ? `${Math.ceil(Math.min(size, questions.length) * 1.5)} min` : 'Unlimited'}</strong></span><span>Pass mark <strong>{passingScore}%</strong></span></div>
        <button className="primary wide" onClick={onStart}>Start mock exam</button>
      </section>
    </div>
  )
}

function QuizScreen({ session, bookmarks, onAnswer, onSetAnswers, onBookmark, onToggleReview, onSubmit, onChangeAnswer, onNavigate, onFinish, onExit }: {
  session: Session
  bookmarks: string[]
  onAnswer: (question: Question, choiceId: string) => void
  onSetAnswers: (question: Question, answers: string[]) => void
  onBookmark: (id: string) => void
  onToggleReview: (id: string) => void
  onSubmit: () => void
  onChangeAnswer: (id: string) => void
  onNavigate: (index: number) => void
  onFinish: () => void
  onExit: () => void
}) {
  const question = session.questions[session.index]
  const selected = session.answers[question.id] ?? []
  const submitted = session.submitted.includes(question.id)
  const correct = submitted && isCorrect(question, selected)
  const matchPairs = getMatchPairs(question)
  return (
    <div className="quiz-layout">
      <aside className="question-nav">
        <div><span className="eyebrow">{session.mode === 'exam' ? 'MOCK EXAM' : 'PRACTICE'}</span><strong>{session.index + 1} / {session.questions.length}</strong></div>
        <div className="question-grid">
          {session.questions.map((item, index) => (
            <button
              key={item.id}
              className={`${index === session.index ? 'current' : ''} ${(session.answers[item.id]?.length ?? 0) > 0 ? 'answered' : ''} ${session.markedForReview.includes(item.id) ? 'marked-review' : ''}`}
              onClick={() => onNavigate(index)}
              aria-label={`Question ${index + 1}${session.markedForReview.includes(item.id) ? ', marked for review' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="nav-legend">
          <span><i className="legend-answered" /> Answered</span>
          <span><i className="legend-review" /> Review</span>
        </div>
        {session.markedForReview.length > 0 && (
          <button
            className="text-button review-jump"
            onClick={() => {
              const nextIndex = session.questions.findIndex(
                (item, index) => index > session.index && session.markedForReview.includes(item.id),
              )
              const firstIndex = session.questions.findIndex((item) => session.markedForReview.includes(item.id))
              onNavigate(nextIndex >= 0 ? nextIndex : firstIndex)
            }}
          >
            Review marked ({session.markedForReview.length})
          </button>
        )}
        <button className="text-button review-finish-link" onClick={onFinish}>Review & finish</button>
        <button className="text-button" onClick={onExit}>Exit session</button>
      </aside>
      <section className="question-stage">
        <div className="quiz-status">
          <span>{question.category}</span>
          {session.secondsLeft !== null && <strong className={session.secondsLeft < 60 ? 'time-warning' : ''}>{formatDuration(session.secondsLeft)}</strong>}
          <button
            className={`review-flag ${session.markedForReview.includes(question.id) ? 'active' : ''}`}
            onClick={() => onToggleReview(question.id)}
          >
            {session.markedForReview.includes(question.id) ? 'Flagged for review' : 'Mark for review'}
          </button>
          <button className={`bookmark ${bookmarks.includes(question.id) ? 'saved' : ''}`} onClick={() => onBookmark(question.id)}>{bookmarks.includes(question.id) ? '★ Saved' : '☆ Bookmark'}</button>
        </div>
        <article className="question-card">
          <div className="question-meta"><span>QUESTION {question.number}</span><span>{question.type === 'multiple' ? 'Select all that apply' : matchPairs.length ? 'Drag each item to its match' : 'Select one answer'}</span></div>
          <h1>{question.prompt}</h1>
          {question.needsReview && <div className="review-note">Source note: this item contains wording or answer ambiguity and is preserved for review.</div>}
          {matchPairs.length ? (
            <MatchingBoard
              key={question.id}
              pairs={matchPairs}
              answers={selected}
              disabled={submitted}
              reveal={submitted}
              onChange={(answers) => onSetAnswers(question, answers)}
            />
          ) : <div className="answers">
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
          </div>}
          {question.image && (
            <details className="question-source">
              <summary>View original source</summary>
              <p>Use this only to verify the transcribed text.</p>
              <img className="question-image" src={`${import.meta.env.BASE_URL}${question.image}`} alt={`Original source for question ${question.number}`} loading="lazy" />
            </details>
          )}
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
            {session.mode === 'practice' && submitted && <button className="secondary" onClick={() => onChangeAnswer(question.id)}>Change answer</button>}
            {session.index < session.questions.length - 1 ? (
              <button className={submitted || session.mode === 'exam' ? 'primary' : 'secondary'} onClick={() => onNavigate(session.index + 1)}>Next</button>
            ) : <button className="primary" onClick={onFinish}>Review & finish</button>}
          </div>
        </div>
      </section>
    </div>
  )
}

function MatchingBoard({
  pairs,
  answers,
  disabled,
  reveal,
  onChange,
}: {
  pairs: ReturnType<typeof getMatchPairs>
  answers: string[]
  disabled: boolean
  reveal: boolean
  onChange: (answers: string[]) => void
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [itemOrder] = useState(() => shuffleQuestions(pairs))
  const assignments = new Map(
    answers
      .map((answer) => answer.split('='))
      .filter((parts) => parts.length === 2)
      .map(([targetId, itemId]) => [targetId, itemId]),
  )
  const assignedItems = new Set(assignments.values())
  const availableItems = itemOrder.filter((pair) => !assignedItems.has(pair.id))

  const commit = (next: Map<string, string>) => {
    onChange([...next].map(([target, item]) => `${target}=${item}`))
  }

  const assign = (targetId: string, itemId: string) => {
    if (disabled || !pairs.some((pair) => pair.id === itemId)) return
    const next = new Map(assignments)
    for (const [existingTarget, existingItem] of next) {
      if (existingItem === itemId || existingTarget === targetId) next.delete(existingTarget)
    }
    next.set(targetId, itemId)
    commit(next)
    setActiveItem(null)
  }

  const remove = (targetId: string) => {
    if (disabled) return
    const next = new Map(assignments)
    next.delete(targetId)
    commit(next)
  }

  return (
    <div className="matching-board">
      <div className="matching-instructions">
        <strong>Items to match</strong>
        <span>Drag an item, or select it and then select a drop zone.</span>
      </div>
      <div className="matching-pool" aria-label="Items to match">
        {availableItems.map((pair) => (
          <button
            type="button"
            key={pair.id}
            className={`drag-item ${activeItem === pair.id ? 'active' : ''}`}
            draggable={!disabled}
            onDragStart={(event) => event.dataTransfer.setData('text/plain', pair.id)}
            onClick={() => !disabled && setActiveItem(activeItem === pair.id ? null : pair.id)}
            disabled={disabled}
          >
            <span className="drag-handle" aria-hidden="true">::</span>
            {pair.item}
          </button>
        ))}
        {!availableItems.length && <span className="pool-complete">All items placed</span>}
      </div>
      <div className="drop-list">
        {pairs.map((target) => {
          const itemId = assignments.get(target.id)
          const item = pairs.find((pair) => pair.id === itemId)
          const placementCorrect = itemId === target.id
          return (
            <div
              key={target.id}
              className={`drop-row ${item ? 'filled' : ''} ${reveal ? placementCorrect ? 'correct' : 'wrong' : ''}`}
              onDragOver={(event) => {
                if (!disabled) event.preventDefault()
              }}
              onDrop={(event) => {
                event.preventDefault()
                assign(target.id, event.dataTransfer.getData('text/plain'))
              }}
            >
              <div className="drop-target-label">{target.target}</div>
              <button
                type="button"
                className="drop-zone"
                onClick={() => {
                  if (activeItem) assign(target.id, activeItem)
                  else if (item) remove(target.id)
                }}
                disabled={disabled}
                aria-label={item ? `${item.item}, matched to ${target.target}` : `Drop item for ${target.target}`}
              >
                {item ? (
                  <>
                    <span className="drag-handle" aria-hidden="true">::</span>
                    <span>{item.item}</span>
                    {!disabled && <small>Remove</small>}
                  </>
                ) : (
                  <span>{activeItem ? 'Place selected item' : 'Drop here'}</span>
                )}
              </button>
            </div>
          )
        })}
      </div>
      {!disabled && answers.length > 0 && (
        <button type="button" className="text-button matching-reset" onClick={() => onChange([])}>
          Reset matches
        </button>
      )}
    </div>
  )
}

function SessionReview({
  session,
  onBack,
  onQuestion,
  onSubmit,
}: {
  session: Session
  onBack: () => void
  onQuestion: (index: number) => void
  onSubmit: () => void
}) {
  const unanswered = session.questions.filter(
    (question) => !(session.answers[question.id]?.length > 0),
  )
  const marked = session.questions.filter((question) =>
    session.markedForReview.includes(question.id),
  )
  const priorityIds = new Set([...marked, ...unanswered].map((question) => question.id))
  const priorityQuestions = session.questions.filter((question) => priorityIds.has(question.id))

  return (
    <div className="page session-review-page">
      <div className="review-topbar">
        <button className="back-button" onClick={onBack}>← Return to questions</button>
        {session.secondsLeft !== null && (
          <strong className={session.secondsLeft < 60 ? 'time-warning' : ''}>
            {formatDuration(session.secondsLeft)}
          </strong>
        )}
      </div>
      <section className="session-review-card">
        <span className="eyebrow">FINAL REVIEW</span>
        <h1>Review before submitting</h1>
        <p>You can return to any question and change your answer before final submission.</p>
        <div className="review-summary">
          <article><strong>{session.questions.length - unanswered.length}</strong><small>Answered</small></article>
          <article><strong>{unanswered.length}</strong><small>Unanswered</small></article>
          <article><strong>{marked.length}</strong><small>Marked for review</small></article>
        </div>

        {priorityQuestions.length > 0 ? (
          <div className="priority-review">
            <h2>Needs attention</h2>
            {priorityQuestions.map((question) => {
              const index = session.questions.findIndex((item) => item.id === question.id)
              const isMarked = session.markedForReview.includes(question.id)
              const isUnanswered = !(session.answers[question.id]?.length > 0)
              return (
                <button key={question.id} onClick={() => onQuestion(index)}>
                  <span>Question {index + 1}</span>
                  <strong>{question.prompt}</strong>
                  <small>
                    {[
                      isMarked ? 'Marked for review' : '',
                      isUnanswered ? 'Unanswered' : 'Answered',
                    ].filter(Boolean).join(' · ')}
                  </small>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="review-ready">
            <strong>Everything is answered</strong>
            <span>No questions are currently marked for review.</span>
          </div>
        )}

        <div className="review-question-grid" aria-label="All session questions">
          {session.questions.map((question, index) => (
            <button
              key={question.id}
              className={`${session.answers[question.id]?.length ? 'answered' : ''} ${session.markedForReview.includes(question.id) ? 'marked-review' : ''}`}
              onClick={() => onQuestion(index)}
              aria-label={`Edit question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="review-submit-row">
          <button className="secondary" onClick={onBack}>Keep reviewing</button>
          <button className="primary" onClick={onSubmit}>Submit final answers</button>
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
          return <article className="review-item" key={question.id}><span className={`review-status ${selected.length === 0 ? 'blank' : correct ? 'right' : 'miss'}`}>{selected.length === 0 ? '—' : correct ? '✓' : '×'}</span><div><strong>Question {question.number}: {question.prompt}</strong><p>Your answer: {selected.length ? formatResponse(question, selected) : 'Unanswered'}</p>{!correct && <p className="correct-answer">Correct: {formatResponse(question, question.correctAnswers, true)}</p>}<small>{question.explanation}</small></div></article>
        })}
        {!visible.length && <div className="empty-state"><strong>No questions in this filter</strong></div>}
      </section>
    </div>
  )
}

function formatResponse(question: Question, selected: string[], correctOnly = false): string {
  const pairs = getMatchPairs(question)
  if (pairs.length) {
    const assignments = correctOnly
      ? new Map(pairs.map((pair) => [pair.id, pair.id]))
      : new Map(selected.map((answer) => answer.split('=') as [string, string]))
    return pairs
      .map((target) => {
        const item = pairs.find((pair) => pair.id === assignments.get(target.id))
        return item ? `${target.target}: ${item.item}` : `${target.target}: Unmatched`
      })
      .join('; ')
  }

  const answerIds = correctOnly ? question.correctAnswers : selected
  return answerIds
    .map((id) => question.choices.find((choice) => choice.id === id)?.text)
    .filter(Boolean)
    .join('; ')
}

export default App
