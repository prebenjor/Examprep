import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AppShell, ConfirmDialog, Notice } from './AppShell'

describe('application UI components', () => {
  it('navigates from desktop and mobile destinations', () => {
    const navigate = vi.fn()
    render(
      <AppShell active="dashboard" theme="light" sessionActive={false} onNavigate={navigate} onTheme={() => {}}>
        <p>Content</p>
      </AppShell>,
    )
    fireEvent.click(screen.getAllByRole('button', { name: 'Browse' })[0])
    expect(navigate).toHaveBeenCalledWith('browse')
    expect(screen.getAllByRole('button', { name: 'Home' })[0].classList.contains('active')).toBe(true)
  })

  it('focuses cancel and performs confirmation actions', () => {
    const confirm = vi.fn()
    render(
      <ConfirmDialog
        open
        title="Leave?"
        message="Progress will be lost."
        confirmLabel="Leave"
        onConfirm={confirm}
        onCancel={() => {}}
      />,
    )
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Cancel' }))
    fireEvent.click(screen.getByRole('button', { name: 'Leave' }))
    expect(confirm).toHaveBeenCalledOnce()
  })

  it('exposes notifications as status messages', () => {
    render(<Notice message="Saved" onDismiss={() => {}} />)
    expect(screen.getByRole('status').textContent).toContain('Saved')
  })
})
