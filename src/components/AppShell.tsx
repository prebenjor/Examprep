import { useEffect, useRef } from 'react'

export type PrimaryDestination = 'dashboard' | 'browse' | 'progress' | 'data'
export type IconName =
  | 'home' | 'browse' | 'progress' | 'data' | 'moon' | 'sun' | 'play'
  | 'book' | 'exam' | 'retry' | 'bookmark' | 'flag' | 'menu' | 'close'
  | 'arrow-left' | 'arrow-right' | 'search' | 'check' | 'warning'

const paths: Record<IconName, React.ReactNode> = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5" /><path d="M9 21v-7h6v7" /></>,
  browse: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /><path d="M8 9h6M8 12h4" /></>,
  progress: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
  moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.41M17.66 6.34l1.41-1.41" /></>,
  play: <path d="m8 5 11 7-11 7V5Z" />,
  book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22.5v-17Z" /><path d="M4 18.5A3.5 3.5 0 0 1 7.5 15H20" /></>,
  exam: <><path d="M7 3h10v4H7z" /><path d="M5 5H3v16h18V5h-2" /><path d="m8 13 2 2 5-5" /></>,
  retry: <><path d="M20 7v5h-5" /><path d="M18.5 17a8 8 0 1 1 .5-10l1 5" /></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z" />,
  flag: <><path d="M5 21V4" /><path d="M5 5h11l-2 4 2 4H5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  'arrow-left': <path d="m15 18-6-6 6-6" />,
  'arrow-right': <path d="m9 18 6-6-6-6" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  warning: <><path d="M12 3 2 21h20L12 3Z" /><path d="M12 9v5M12 18h.01" /></>,
}

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

const destinations: Array<{ id: PrimaryDestination; label: string; icon: IconName }> = [
  { id: 'dashboard', label: 'Home', icon: 'home' },
  { id: 'browse', label: 'Browse', icon: 'browse' },
  { id: 'progress', label: 'Progress', icon: 'progress' },
  { id: 'data', label: 'Data', icon: 'data' },
]

export function AppShell({
  active,
  theme,
  sessionActive,
  onNavigate,
  onTheme,
  children,
}: {
  active: PrimaryDestination
  theme: 'light' | 'dark'
  sessionActive: boolean
  onNavigate: (destination: PrimaryDestination) => void
  onTheme: () => void
  children: React.ReactNode
}) {
  if (sessionActive) return <div className="session-shell">{children}</div>

  return (
    <div className="learning-shell">
      <aside className="app-sidebar">
        <button className="brand" onClick={() => onNavigate('dashboard')} aria-label="CMDB Prep home">
          <span className="brand-mark">C</span>
          <span><strong>CMDB Prep</strong><small>Learn with focus</small></span>
        </button>
        <nav aria-label="Main navigation">
          {destinations.map((item) => (
            <button key={item.id} aria-current={active === item.id ? 'page' : undefined} className={active === item.id ? 'active' : ''} onClick={() => onNavigate(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="sidebar-theme" onClick={onTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
        <small className="sidebar-note">Unofficial study aid<br />Pass mark: 80%</small>
      </aside>
      <div className="app-content">
        <header className="mobile-header">
          <button className="brand" onClick={() => onNavigate('dashboard')} aria-label="CMDB Prep home">
            <span className="brand-mark">C</span><strong>CMDB Prep</strong>
          </button>
          <button className="icon-control" onClick={onTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
        </header>
        <main>{children}</main>
      </div>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        {destinations.map((item) => (
          <button key={item.id} aria-current={active === item.id ? 'page' : undefined} className={active === item.id ? 'active' : ''} onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon} /><span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    cancelRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onCancel, open])
  if (!open) return null
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-message">
        <span className={`dialog-icon ${danger ? 'danger' : ''}`}><Icon name={danger ? 'warning' : 'check'} /></span>
        <h2 id="dialog-title">{title}</h2>
        <p id="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button ref={cancelRef} className="secondary" onClick={onCancel}>Cancel</button>
          <button className={danger ? 'danger-button' : 'primary'} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </section>
    </div>
  )
}

export function Notice({ message, tone = 'success', onDismiss }: {
  message: string
  tone?: 'success' | 'error'
  onDismiss: () => void
}) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 3200)
    return () => window.clearTimeout(timer)
  }, [message, onDismiss])
  return (
    <div className={`notice ${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <Icon name={tone === 'error' ? 'warning' : 'check'} />
      <span>{message}</span>
      <button onClick={onDismiss} aria-label="Dismiss notification"><Icon name="close" size={16} /></button>
    </div>
  )
}
