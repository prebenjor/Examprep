import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { AppShell, ConfirmDialog, Icon, Notice, type PrimaryDestination } from './components/AppShell'
import { questions } from './data/questions'
import { createBackup, mergeStates, parseBackup } from './lib/backup'
import { formatDuration, getMatchPairs, isCorrect, scoreQuestions, shuffleQuestions } from './lib/quiz'
import { buildQuestionHistory, rankQuestions, selectSmartStudyQuestions } from './lib/smartStudy'
import { clearState, loadState, PASSING_SCORE, saveState, STATE_VERSION } from './lib/storage'
import { buildPracticeOrder, buildStudyOverview, defaultBrowseFilters, filterQuestions, type BrowseFilters } from './lib/studyViews'
import type { AppState, Attempt, AttemptAnswer, ImportSummary, Question, QuestionHistory, QuestionType } from './types'

type Screen = 'dashboard' | 'browse' | 'question-detail' | 'progress' | 'practice' | 'smart' | 'setup' | 'exam' | 'session-review' | 'results' | 'data'

interface Session {
  mode: 'practice' | 'exam' | 'smart'
  questions: Question[]
  answers: Record<string, string[]>
  index: number
  startedAt: number
  secondsLeft: number | null
  submitted: string[]
  markedForReview: string[]
}

interface ConfirmState {
  title: string
  message: string
  confirmLabel: string
  danger?: boolean
  action: () => void
}

interface NoticeState {
  message: string
  tone?: 'success' | 'error'
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
  const [pendingImport, setPendingImport] = useState<{
    state: AppState
    summary: ImportSummary
    fileName: string
  } | null>(null)
  const [importError, setImportError] = useState('')
  const [browseFilters, setBrowseFilters] = useState<BrowseFilters>(defaultBrowseFilters)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [answerRevealed, setAnswerRevealed] = useState(false)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [notice, setNotice] = useState<NoticeState | null>(null)

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

  const updateState = (updater: (current: AppState) => AppState) =>
    setState((current) => ({ ...updater(current), updatedAt: new Date().toISOString() }))

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

  const startPracticeWithQuestions = (sessionQuestions: Question[]) => {
    setSession(initialSession('practice', sessionQuestions.length ? sessionQuestions : questions, null))
    setScreen('practice')
  }

  const startExam = () => {
    const selected = shuffleQuestions(questions).slice(0, Math.min(examSize, questions.length))
    setSession(initialSession('exam', selected, timed ? selected.length * 90 : null))
    setScreen('exam')
  }

  const startSmartStudy = () => {
    const selected = selectSmartStudyQuestions(questions, state, 20)
    setSession(initialSession('smart', selected, null))
    setScreen('smart')
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
    const saved = !state.bookmarks.includes(questionId)
    updateState((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(questionId)
        ? current.bookmarks.filter((id) => id !== questionId)
        : [...current.bookmarks, questionId],
    }))
    setNotice({ message: saved ? 'Question bookmarked.' : 'Bookmark removed.' })
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
      updatedAt: new Date().toISOString(),
      attempts: [attempt, ...current.attempts],
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

  const navigate = (destination: PrimaryDestination) => {
    setSession(null)
    setResult(null)
    setSelectedQuestion(null)
    setAnswerRevealed(false)
    setScreen(destination)
  }

  const requestExitSession = () => {
    setConfirm({
      title: 'Exit this study session?',
      message: 'Answers from this unfinished session will not be saved.',
      confirmLabel: 'Exit session',
      danger: true,
      action: goHome,
    })
  }

  const requestFinalSubmit = () => {
    if (!session) return
    const unanswered = session.questions.filter((question) => !(session.answers[question.id]?.length > 0)).length
    if (unanswered > 0) {
      setConfirm({
        title: 'Submit with unanswered questions?',
        message: `${unanswered} question${unanswered === 1 ? ' is' : 's are'} unanswered and will count against the final score.`,
        confirmLabel: 'Submit anyway',
        action: finishSession,
      })
      return
    }
    finishSession()
  }

  const activeDestination: PrimaryDestination =
    screen === 'browse' || screen === 'question-detail'
      ? 'browse'
      : screen === 'progress' || screen === 'results'
        ? 'progress'
        : screen === 'data'
          ? 'data'
          : 'dashboard'
  const sessionActive = Boolean(session && ['practice', 'smart', 'exam', 'session-review'].includes(screen))

  return (
    <AppShell
      active={activeDestination}
      theme={state.theme}
      sessionActive={sessionActive}
      onNavigate={navigate}
      onTheme={() => updateState((current) => ({
        ...current,
        preferencesUpdatedAt: new Date().toISOString(),
        theme: current.theme === 'light' ? 'dark' : 'light',
      }))}
    >
        {screen === 'dashboard' && (
          <Dashboard
            state={state}
            accuracy={stats.accuracy}
            completed={stats.completed}
            onPractice={() => startPractice()}
            onSmart={startSmartStudy}
            onExam={() => setScreen('setup')}
            onBrowse={() => setScreen('browse')}
            onProgress={() => setScreen('progress')}
            onRetry={() => startPractice(true)}
            onReset={() => {
              setConfirm({
                title: 'Reset all local progress?',
                message: 'Attempts, bookmarks, and study history on this device will be permanently removed.',
                confirmLabel: 'Reset progress',
                danger: true,
                action: () => {
                  clearState()
                  setState({
                    version: STATE_VERSION,
                    updatedAt: new Date().toISOString(),
                    preferencesUpdatedAt: new Date().toISOString(),
                    attempts: [],
                    bookmarks: [],
                    completedQuestionIds: [],
                    theme: state.theme,
                    passingScore: PASSING_SCORE,
                  })
                  setNotice({ message: 'Local progress was reset.' })
                },
              })
            }}
          />
        )}
        {screen === 'browse' && (
          <QuestionBrowser
            state={state}
            filters={browseFilters}
            onFilters={setBrowseFilters}
            onQuestion={(question) => {
              setSelectedQuestion(question)
              setAnswerRevealed(false)
              setScreen('question-detail')
            }}
          />
        )}
        {screen === 'question-detail' && selectedQuestion && (
          <QuestionDetail
            question={selectedQuestion}
            history={buildQuestionHistory(selectedQuestion, state)}
            bookmarked={state.bookmarks.includes(selectedQuestion.id)}
            revealed={answerRevealed}
            onBack={() => setScreen('browse')}
            onReveal={() => setAnswerRevealed(true)}
            onBookmark={() => toggleBookmark(selectedQuestion.id)}
            onPractice={() => {
              const filtered = filterQuestions(questions, state, browseFilters).map((item) => item.question)
              startPracticeWithQuestions(buildPracticeOrder(selectedQuestion, filtered))
            }}
          />
        )}
        {screen === 'progress' && (
          <ProgressPage
            state={state}
            onBrowseWeak={() => {
              setBrowseFilters({ ...defaultBrowseFilters, status: 'weak' })
              setScreen('browse')
            }}
            onSmart={startSmartStudy}
          />
        )}
        {screen === 'data' && (
          <DataBackup
            state={state}
            pendingImport={pendingImport}
            error={importError}
            onBack={goHome}
            onExport={() => {
              exportProgress(state)
              setNotice({ message: 'Progress backup downloaded.' })
            }}
            onImport={(text, fileName) => {
              try {
                const backup = parseBackup(text)
                const merged = mergeStates(state, backup.state)
                setPendingImport({ ...merged, fileName })
                setImportError('')
                setNotice({ message: 'Backup validated. Review the merge summary.' })
              } catch (error) {
                setPendingImport(null)
                setImportError(error instanceof Error ? error.message : 'Could not read this backup.')
              }
            }}
            onCancelImport={() => setPendingImport(null)}
            onConfirmImport={() => {
              if (!pendingImport) return
              setConfirm({
                title: 'Merge this backup?',
                message: 'Unique attempts, bookmarks, and completion history will be added to this device.',
                confirmLabel: 'Merge progress',
                action: () => {
                  setState(pendingImport.state)
                  setPendingImport(null)
                  setImportError('')
                  setNotice({ message: 'Progress merged successfully.' })
                },
              })
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
        {(screen === 'practice' || screen === 'smart' || screen === 'exam') && session && (
          <QuizScreen
            session={session}
            bookmarks={state.bookmarks}
            questionHistory={buildQuestionHistory(session.questions[session.index], state)}
            onAnswer={toggleAnswer}
            onSetAnswers={setQuestionAnswers}
            onBookmark={toggleBookmark}
            onToggleReview={toggleMarkedForReview}
            onSubmit={submitPracticeAnswer}
            onChangeAnswer={changePracticeAnswer}
            onNavigate={(index) => setSession({ ...session, index })}
            onFinish={() => setScreen('session-review')}
            onExit={requestExitSession}
          />
        )}
        {screen === 'session-review' && session && (
          <SessionReview
            session={session}
            onBack={() => setScreen(session.mode)}
            onQuestion={(index) => {
              setSession({ ...session, index })
              setScreen(session.mode)
            }}
            onSubmit={requestFinalSubmit}
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
      {confirm && (
        <ConfirmDialog
          open
          title={confirm.title}
          message={confirm.message}
          confirmLabel={confirm.confirmLabel}
          danger={confirm.danger}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            const action = confirm.action
            setConfirm(null)
            action()
          }}
        />
      )}
      {notice && <Notice message={notice.message} tone={notice.tone} onDismiss={() => setNotice(null)} />}
    </AppShell>
  )
}

function Dashboard({
  state,
  accuracy,
  completed,
  onPractice,
  onSmart,
  onExam,
  onBrowse,
  onProgress,
  onRetry,
  onReset,
}: {
  state: AppState
  accuracy: number
  completed: number
  onPractice: () => void
  onSmart: () => void
  onExam: () => void
  onBrowse: () => void
  onProgress: () => void
  onRetry: () => void
  onReset: () => void
}) {
  const ranked = rankQuestions(questions, state)
  const dueCount = ranked.filter(({ history }) => history.priority >= 400).length
  const weakCategories = Object.entries(
    ranked.reduce<Record<string, number>>((acc, { question, history }) => {
      if (history.latestResult === 'incorrect' || history.latestResult === 'unanswered') {
        acc[question.category] = (acc[question.category] ?? 0) + 1
      }
      return acc
    }, {}),
  ).sort((left, right) => right[1] - left[1]).slice(0, 3)
  return (
    <div className="page dashboard-page page-enter">
      <header className="page-heading">
        <div><span className="eyebrow">WELCOME BACK</span><h1>Ready for your next study session?</h1></div>
        <button className="secondary compact-button" onClick={onBrowse}><Icon name="browse" /> Browse questions</button>
      </header>

      <section className="smart-hero">
        <div className="smart-copy">
          <span className="hero-icon"><Icon name="play" size={26} /></span>
          <div>
            <span className="eyebrow light">RECOMMENDED NEXT</span>
            <h2>Continue Smart Study</h2>
            <p>A focused set of 20 questions selected from weak, stale, flagged, and unseen topics.</p>
          </div>
          <button className="hero-action" onClick={onSmart}>Start session <Icon name="arrow-right" /></button>
        </div>
        <div className="hero-stats">
          <span><strong>{dueCount}</strong><small>Due now</small></span>
          <span><strong>{accuracy}%</strong><small>Accuracy</small></span>
          <span><strong>{completed}</strong><small>Seen</small></span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-main">
          <div className="section-heading">
            <div><span className="eyebrow">STUDY YOUR WAY</span><h2>Other study modes</h2></div>
          </div>
          <div className="quick-mode-grid">
            <button className="quick-mode" onClick={onPractice}>
              <span className="quick-icon purple"><Icon name="book" /></span>
              <span><strong>Practice</strong><small>Immediate answers and explanations</small></span>
              <Icon name="arrow-right" />
            </button>
            <button className="quick-mode" onClick={onExam}>
              <span className="quick-icon green"><Icon name="exam" /></span>
              <span><strong>Mock exam</strong><small>Timed or untimed certification practice</small></span>
              <Icon name="arrow-right" />
            </button>
            <button className="quick-mode" onClick={onRetry}>
              <span className="quick-icon orange"><Icon name="retry" /></span>
              <span><strong>Review mistakes</strong><small>Retry questions answered incorrectly</small></span>
              <Icon name="arrow-right" />
            </button>
          </div>
          <section className="panel weak-panel">
            <div className="section-heading">
              <div><span className="eyebrow">FOCUS AREAS</span><h2>Weak topics</h2></div>
              <button className="text-button" onClick={onProgress}>View progress</button>
            </div>
            {weakCategories.length ? weakCategories.map(([category, count]) => (
              <button className="topic-row" key={category} onClick={onProgress}>
                <span><strong>{category}</strong><small>{count} question{count === 1 ? '' : 's'} need attention</small></span>
                <span className="topic-count">{count}</span>
              </button>
            )) : <div className="empty-state compact"><strong>No weak topics yet</strong><small>Complete a session to create your baseline.</small></div>}
          </section>
        </div>
        <aside className="panel activity-panel">
          <div className="readiness-ring" style={{ '--score': `${accuracy * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{accuracy}%</strong><small>Readiness</small></div>
          </div>
          <div className="activity-heading"><span className="eyebrow">RECENT ACTIVITY</span><h2>Your attempts</h2></div>
          {state.attempts.length === 0 ? (
            <div className="empty-state"><strong>No attempts yet</strong><small>Your latest scores will appear here.</small></div>
          ) : state.attempts.slice(0, 5).map((attempt) => (
            <div className="attempt-row" key={attempt.id}>
              <span className={`score-dot ${attempt.score >= state.passingScore ? 'pass' : 'fail'}`}>{attempt.score}%</span>
              <div><strong>{attempt.mode === 'exam' ? 'Mock exam' : attempt.mode === 'smart' ? 'Smart Study' : 'Practice'}</strong><small>{new Date(attempt.completedAt).toLocaleDateString()} · {attempt.questionIds.length} questions</small></div>
            </div>
          ))}
          {state.attempts.length > 0 && <button className="text-button danger" onClick={onReset}>Reset local progress</button>}
        </aside>
      </section>
    </div>
  )
}

function QuestionBrowser({
  state,
  filters,
  onFilters,
  onQuestion,
}: {
  state: AppState
  filters: BrowseFilters
  onFilters: (filters: BrowseFilters) => void
  onQuestion: (question: Question) => void
}) {
  const categories = [...new Set(questions.map((question) => question.category))].sort()
  const visible = filterQuestions(questions, state, filters)
  const statusOptions: Array<{ value: BrowseFilters['status']; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'bookmarked', label: 'Bookmarked' },
    { value: 'weak', label: 'Weak' },
    { value: 'unseen', label: 'Unseen' },
    { value: 'incorrect', label: 'Incorrect' },
    { value: 'source-review', label: 'Source review' },
  ]
  return (
    <div className="page browse-page page-enter">
      <header className="page-heading">
        <div><span className="eyebrow">QUESTION LIBRARY</span><h1>Browse all 192 questions</h1><p>Search the bank, inspect your history, and start focused practice.</p></div>
        <span className="result-count">{visible.length} results</span>
      </header>
      <section className="browser-controls panel">
        <label className="search-field">
          <Icon name="search" />
          <input
            value={filters.search}
            onChange={(event) => onFilters({ ...filters, search: event.target.value })}
            placeholder="Search questions, choices, or categories"
            aria-label="Search questions"
          />
        </label>
        <div className="select-filters">
          <label>Category
            <select value={filters.category} onChange={(event) => onFilters({ ...filters, category: event.target.value })}>
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label>Type
            <select value={filters.type} onChange={(event) => onFilters({ ...filters, type: event.target.value as QuestionType | 'all' })}>
              <option value="all">All types</option>
              <option value="single">Single choice</option>
              <option value="multiple">Multiple choice</option>
              <option value="matching">Matching</option>
              <option value="image">Image based</option>
            </select>
          </label>
        </div>
        <div className="filter-chips" aria-label="Question status filters">
          {statusOptions.map((option) => (
            <button key={option.value} className={filters.status === option.value ? 'active' : ''} onClick={() => onFilters({ ...filters, status: option.value })}>
              {option.label}
            </button>
          ))}
        </div>
      </section>
      <section className="question-list">
        {visible.map(({ question, history }) => (
          <button className="question-list-item" key={question.id} onClick={() => onQuestion(question)}>
            <span className="question-number">{question.number}</span>
            <span className="question-list-copy">
              <span className="question-list-meta">{question.category} · {formatQuestionType(question.type)}</span>
              <strong>{question.prompt}</strong>
              <small>{history.priorityReason}</small>
            </span>
            <span className={`history-badge ${history.latestResult}`}>{formatHistoryResult(history.latestResult)}</span>
            <Icon name="arrow-right" />
          </button>
        ))}
        {!visible.length && <div className="empty-state panel"><strong>No matching questions</strong><small>Clear a filter or try a broader search.</small></div>}
      </section>
    </div>
  )
}

function QuestionDetail({
  question,
  history,
  bookmarked,
  revealed,
  onBack,
  onReveal,
  onBookmark,
  onPractice,
}: {
  question: Question
  history: QuestionHistory
  bookmarked: boolean
  revealed: boolean
  onBack: () => void
  onReveal: () => void
  onBookmark: () => void
  onPractice: () => void
}) {
  const matchPairs = getMatchPairs(question)
  return (
    <div className="page detail-page page-enter">
      <button className="back-button" onClick={onBack}><Icon name="arrow-left" /> Back to Browse</button>
      <section className="detail-layout">
        <article className="question-card detail-card">
          <div className="question-meta"><span>QUESTION {question.number}</span><span>{question.category}</span></div>
          <h1>{question.prompt}</h1>
          <div className="detail-choices">
            {matchPairs.length ? matchPairs.map((pair) => (
              <div className={revealed ? 'revealed-correct' : ''} key={pair.id}><span>{pair.target}</span><strong>{revealed ? pair.item : 'Match hidden'}</strong></div>
            )) : question.choices.map((choice) => (
              <div className={revealed && question.correctAnswers.includes(choice.id) ? 'revealed-correct' : ''} key={choice.id}>
                <span className="choice-letter">{choice.id}</span><span>{choice.text}</span>
                {revealed && question.correctAnswers.includes(choice.id) && <Icon name="check" />}
              </div>
            ))}
          </div>
          {!revealed ? (
            <button className="secondary reveal-button" onClick={onReveal}>Reveal answer</button>
          ) : (
            <div className="feedback good"><strong>Explanation</strong><p>{question.explanation}</p></div>
          )}
          {question.image && <details className="question-source"><summary>View original source</summary><img className="question-image" src={`${import.meta.env.BASE_URL}${question.image}`} alt={`Original source for question ${question.number}`} /></details>}
        </article>
        <aside className="detail-sidebar">
          <section className="panel">
            <span className="eyebrow">YOUR HISTORY</span>
            <h2>{history.priorityReason}</h2>
            <div className="detail-stats">
              <span><strong>{history.attempts}</strong><small>Attempts</small></span>
              <span><strong>{history.accuracy}%</strong><small>Accuracy</small></span>
              <span><strong>{history.lastAttemptedAt ? new Date(history.lastAttemptedAt).toLocaleDateString() : 'Never'}</strong><small>Last studied</small></span>
            </div>
          </section>
          <button className="primary wide" onClick={onPractice}><Icon name="play" /> Practice from this question</button>
          <button className="secondary wide" onClick={onBookmark}><Icon name="bookmark" /> {bookmarked ? 'Remove bookmark' : 'Bookmark question'}</button>
        </aside>
      </section>
    </div>
  )
}

function ProgressPage({
  state,
  onBrowseWeak,
  onSmart,
}: {
  state: AppState
  onBrowseWeak: () => void
  onSmart: () => void
}) {
  const overview = buildStudyOverview(questions, state)
  return (
    <div className="page progress-page page-enter">
      <header className="page-heading">
        <div><span className="eyebrow">YOUR PROGRESS</span><h1>Build confidence by closing gaps</h1><p>Mastery uses your latest answer for each question.</p></div>
        <button className="primary" onClick={onSmart}><Icon name="play" /> Smart Study</button>
      </header>
      <section className="progress-summary">
        <article className="readiness-card panel">
          <div className="readiness-ring large" style={{ '--score': `${overview.accuracy * 3.6}deg` } as React.CSSProperties}>
            <div><strong>{overview.accuracy}%</strong><small>Accuracy</small></div>
          </div>
          <div><span className="eyebrow">OVERALL READINESS</span><h2>{overview.accuracy >= 80 ? 'On target' : 'Keep building'}</h2><p>{overview.totalCorrect} correct answers from {overview.totalAnswers} total responses.</p></div>
        </article>
        <div className="progress-metrics">
          <article><span className="quick-icon purple"><Icon name="book" /></span><strong>{overview.attemptedQuestions}</strong><small>Questions seen</small></article>
          <article><span className="quick-icon orange"><Icon name="warning" /></span><strong>{overview.weakQuestions}</strong><small>Weak questions</small></article>
          <article><span className="quick-icon green"><Icon name="progress" /></span><strong>{state.attempts.length}</strong><small>Sessions complete</small></article>
          <article><span className="quick-icon blue"><Icon name="bookmark" /></span><strong>{state.bookmarks.length}</strong><small>Bookmarked</small></article>
        </div>
      </section>
      <section className="progress-grid">
        <div className="panel mastery-panel">
          <div className="section-heading"><div><span className="eyebrow">CATEGORY MASTERY</span><h2>Where to focus</h2></div><button className="text-button" onClick={onBrowseWeak}>Browse weak questions</button></div>
          {overview.categoryMastery.map((item) => (
            <div className="mastery-row" key={item.category}>
              <div><strong>{item.category}</strong><small>{item.correct} mastered · {item.attempted}/{item.total} attempted</small></div>
              <div className="mastery-value"><span>{item.percent}%</span><div className="progress-track"><span style={{ width: `${item.percent}%` }} /></div></div>
            </div>
          ))}
        </div>
        <aside className="panel progress-history">
          <span className="eyebrow">RECENT SESSIONS</span><h2>Latest results</h2>
          {state.attempts.slice(0, 8).map((attempt) => (
            <div className="attempt-row" key={attempt.id}>
              <span className={`score-dot ${attempt.score >= state.passingScore ? 'pass' : 'fail'}`}>{attempt.score}%</span>
              <div><strong>{formatAttemptMode(attempt.mode)}</strong><small>{new Date(attempt.completedAt).toLocaleDateString()} · {attempt.questionIds.length} questions</small></div>
            </div>
          ))}
          {!state.attempts.length && <div className="empty-state"><strong>No sessions yet</strong><small>Your progress will appear after your first session.</small></div>}
        </aside>
      </section>
    </div>
  )
}

function DataBackup({
  state,
  pendingImport,
  error,
  onBack,
  onExport,
  onImport,
  onCancelImport,
  onConfirmImport,
}: {
  state: AppState
  pendingImport: { state: AppState; summary: ImportSummary; fileName: string } | null
  error: string
  onBack: () => void
  onExport: () => void
  onImport: (text: string, fileName: string) => void
  onCancelImport: () => void
  onConfirmImport: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="page narrow-page data-page">
      <button className="back-button" onClick={onBack}>← Dashboard</button>
      <section className="setup-card">
        <span className="eyebrow">DATA & BACKUP</span>
        <h1>Move progress between devices</h1>
        <p>Export a small JSON backup on one device, then import it on another. Nothing is uploaded to a server.</p>
        <div className="backup-stats">
          <span><strong>{state.attempts.length}</strong> attempts</span>
          <span><strong>{state.bookmarks.length}</strong> bookmarks</span>
          <span><strong>{state.completedQuestionIds.length}</strong> completed</span>
        </div>
        <div className="backup-actions">
          <button className="primary" onClick={onExport}>Export progress</button>
          <button className="secondary" onClick={() => inputRef.current?.click()}>Choose backup to import</button>
          <input
            ref={inputRef}
            className="visually-hidden"
            type="file"
            accept=".json,application/json"
            onChange={async (event) => {
              const file = event.target.files?.[0]
              if (file) onImport(await file.text(), file.name)
              event.target.value = ''
            }}
          />
        </div>
        {error && <div className="import-message error" role="alert">{error}</div>}
        {pendingImport && (
          <div className="import-preview">
            <span className="eyebrow">IMPORT PREVIEW</span>
            <h2>{pendingImport.fileName}</h2>
            <p>Review what will be merged before saving it to this device.</p>
            <div className="import-summary">
              <span><strong>+{pendingImport.summary.addedAttempts}</strong> new attempts</span>
              <span><strong>{pendingImport.summary.duplicateAttempts}</strong> duplicates skipped</span>
              <span><strong>+{pendingImport.summary.addedBookmarks}</strong> bookmarks</span>
              <span><strong>+{pendingImport.summary.addedCompletedQuestions}</strong> completed questions</span>
            </div>
            <p className="preference-note">
              {pendingImport.summary.preferencesFrom === 'import'
                ? 'The imported backup has newer preferences, so its theme will be used.'
                : 'This device has newer preferences, so its theme will be kept.'}
            </p>
            <div className="button-row">
              <button className="primary" onClick={onConfirmImport}>Merge progress</button>
              <button className="secondary" onClick={onCancelImport}>Cancel</button>
            </div>
          </div>
        )}
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

function QuestionHistorySummary({ history }: { history: QuestionHistory }) {
  return (
    <div className="question-history">
      <div>
        <span className="eyebrow">WHY THIS QUESTION</span>
        <strong>{history.priorityReason}</strong>
      </div>
      <span><strong>{history.attempts}</strong><small>Attempts</small></span>
      <span><strong>{history.accuracy}%</strong><small>Accuracy</small></span>
      <span>
        <strong>{history.lastAttemptedAt ? new Date(history.lastAttemptedAt).toLocaleDateString() : 'Never'}</strong>
        <small>Last studied</small>
      </span>
    </div>
  )
}

function QuizScreen({ session, bookmarks, questionHistory, onAnswer, onSetAnswers, onBookmark, onToggleReview, onSubmit, onChangeAnswer, onNavigate, onFinish, onExit }: {
  session: Session
  bookmarks: string[]
  questionHistory: QuestionHistory
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
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const question = session.questions[session.index]
  const selected = session.answers[question.id] ?? []
  const submitted = session.submitted.includes(question.id)
  const correct = submitted && isCorrect(question, selected)
  const matchPairs = getMatchPairs(question)
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.matches('input, select, textarea') || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === 'ArrowLeft' && session.index > 0) onNavigate(session.index - 1)
      if (event.key === 'ArrowRight' && session.index < session.questions.length - 1) onNavigate(session.index + 1)
      if (event.key.toLowerCase() === 'r') onToggleReview(question.id)
      if (event.key.toLowerCase() === 'b') onBookmark(question.id)
      if (event.key === 'Escape') onExit()
      if (event.key === 'Enter' && session.mode !== 'exam' && !submitted && selected.length) onSubmit()
      const choiceIndex = Number(event.key) - 1
      if (!matchPairs.length && choiceIndex >= 0 && choiceIndex < question.choices.length && !submitted) {
        onAnswer(question, question.choices[choiceIndex].id)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [matchPairs.length, onAnswer, onBookmark, onExit, onNavigate, onSubmit, onToggleReview, question, selected.length, session, submitted])
  return (
    <div className="study-session">
      <header className="session-header">
        <button className="icon-control" onClick={onExit} aria-label="Exit session"><Icon name="close" /></button>
        <div className="session-progress">
          <div><span>{session.mode === 'exam' ? 'Mock exam' : session.mode === 'smart' ? 'Smart Study' : 'Practice'}</span><strong>Question {session.index + 1} of {session.questions.length}</strong></div>
          <div className="progress-track"><span style={{ width: `${((session.index + 1) / session.questions.length) * 100}%` }} /></div>
        </div>
        {session.secondsLeft !== null && <strong className={`session-timer ${session.secondsLeft < 60 ? 'time-warning' : ''}`}>{formatDuration(session.secondsLeft)}</strong>}
        <button className="navigator-toggle" onClick={() => setNavigatorOpen(true)}><Icon name="menu" /> Questions</button>
      </header>

      <div className={`navigator-backdrop ${navigatorOpen ? 'open' : ''}`} onMouseDown={(event) => event.target === event.currentTarget && setNavigatorOpen(false)}>
        <aside className={`question-navigator ${navigatorOpen ? 'open' : ''}`} aria-label="Question navigator">
          <div className="navigator-heading">
            <div><span className="eyebrow">SESSION MAP</span><strong>{session.index + 1} / {session.questions.length}</strong></div>
            <button className="icon-control" onClick={() => setNavigatorOpen(false)} aria-label="Close question navigator"><Icon name="close" /></button>
          </div>
        <div className="question-grid">
          {session.questions.map((item, index) => (
            <button
              key={item.id}
              className={`${index === session.index ? 'current' : ''} ${(session.answers[item.id]?.length ?? 0) > 0 ? 'answered' : ''} ${session.markedForReview.includes(item.id) ? 'marked-review' : ''}`}
              onClick={() => { onNavigate(index); setNavigatorOpen(false) }}
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
          <button className="primary wide navigator-finish" onClick={onFinish}>Review & finish</button>
        </aside>
      </div>

      <main className="question-stage">
        <div className="quiz-status">
          <span>{question.category}</span>
          <button
            className={`review-flag ${session.markedForReview.includes(question.id) ? 'active' : ''}`}
            onClick={() => onToggleReview(question.id)}
          >
            <Icon name="flag" size={17} /> {session.markedForReview.includes(question.id) ? 'Review marked' : 'Mark for review'}
          </button>
          <button className={`bookmark ${bookmarks.includes(question.id) ? 'saved' : ''}`} onClick={() => onBookmark(question.id)}><Icon name="bookmark" size={17} /> {bookmarks.includes(question.id) ? 'Saved' : 'Bookmark'}</button>
        </div>
        <article className="question-card">
          <div className="question-meta"><span>QUESTION {question.number}</span><span>{question.type === 'multiple' ? 'Select all that apply' : matchPairs.length ? 'Drag each item to its match' : 'Select one answer'}</span></div>
          {session.mode === 'smart' && <QuestionHistorySummary history={questionHistory} />}
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
                  {!submitted && <kbd>{question.choices.indexOf(choice) + 1}</kbd>}
                  {revealCorrect && <Icon name="check" />}{revealWrong && <b>×</b>}
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
        <div className="quiz-actions sticky-actions">
          <button className="secondary" disabled={session.index === 0} onClick={() => onNavigate(session.index - 1)}><Icon name="arrow-left" /> Previous</button>
          <div>
            {session.mode !== 'exam' && !submitted && <button className="primary" disabled={!selected.length} onClick={onSubmit}>Check answer</button>}
            {session.mode !== 'exam' && submitted && <button className="secondary" onClick={() => onChangeAnswer(question.id)}>Change answer</button>}
            {session.index < session.questions.length - 1 ? (
              <button className={submitted || session.mode === 'exam' ? 'primary' : 'secondary'} onClick={() => onNavigate(session.index + 1)}>Next <Icon name="arrow-right" /></button>
            ) : <button className="primary" onClick={onFinish}>Review & finish</button>}
          </div>
        </div>
        <p className="keyboard-hint">Keyboard: 1–9 choose · Enter check · ←/→ navigate · R review · B bookmark</p>
      </main>
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

function formatQuestionType(type: QuestionType): string {
  return {
    single: 'Single choice',
    multiple: 'Multiple choice',
    matching: 'Matching',
    image: 'Image based',
  }[type]
}

function formatHistoryResult(result: QuestionHistory['latestResult']): string {
  return {
    correct: 'Correct',
    incorrect: 'Needs work',
    unanswered: 'Unanswered',
    unseen: 'Unseen',
  }[result]
}

function formatAttemptMode(mode: Attempt['mode']): string {
  return mode === 'exam' ? 'Mock exam' : mode === 'smart' ? 'Smart Study' : 'Practice'
}

function exportProgress(state: AppState): void {
  const backup = createBackup(state)
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `cmdb-exam-prep-${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

export default App
