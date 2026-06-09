import fs from 'node:fs'
import { chromium } from 'playwright'

const edgePath =
  process.env.BROWSER_PATH ??
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4173/Examprep/'

if (!fs.existsSync(edgePath)) throw new Error(`Browser executable not found: ${edgePath}`)

const browser = await chromium.launch({ headless: true, executablePath: edgePath })

async function assertNoOverflow(page, label) {
  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  if (overflows) throw new Error(`${label} layout has horizontal overflow.`)
}

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await desktop.goto(baseUrl)
  await desktop.getByRole('heading', { name: 'Ready for your next study session?' }).waitFor()
  await assertNoOverflow(desktop, 'Desktop')

  // Browse, search, reveal, bookmark, and begin practice from a selected question.
  await desktop.locator('.app-sidebar').getByRole('button', { name: 'Browse' }).click()
  await desktop.getByRole('heading', { name: 'Browse all 192 questions' }).waitFor()
  await desktop.getByRole('textbox', { name: 'Search questions' }).fill('Principal Class')
  await desktop.locator('.question-list-item').first().click()
  await desktop.getByRole('button', { name: 'Reveal answer' }).click()
  await desktop.getByText('Explanation', { exact: true }).waitFor()
  await desktop.getByRole('button', { name: 'Bookmark question' }).click()
  await desktop.getByRole('status').getByText('Question bookmarked.').waitFor()
  await desktop.getByRole('button', { name: /Practice from this question/ }).click()
  await desktop.locator('.session-header').waitFor()

  // Exit protection and focused session controls.
  await desktop.getByRole('button', { name: 'Exit session' }).click()
  await desktop.getByRole('alertdialog').waitFor()
  await desktop.getByRole('button', { name: 'Cancel' }).click()
  await desktop.getByRole('button', { name: 'Questions' }).click()
  await desktop.getByRole('complementary', { name: 'Question navigator' }).waitFor()
  await desktop.getByRole('button', { name: 'Close question navigator' }).click()
  await desktop.getByRole('button', { name: 'Exit session' }).click()
  await desktop.getByRole('button', { name: 'Exit session', exact: true }).last().click()

  // Smart Study, keyboard answer selection, feedback, and review.
  await desktop.getByRole('heading', { name: 'Ready for your next study session?' }).waitFor()
  await desktop.getByRole('button', { name: /Start session/ }).click()
  await desktop.getByText('Smart Study', { exact: true }).first().waitFor()
  await desktop.keyboard.press('1')
  await desktop.keyboard.press('Enter')
  await desktop.getByRole('button', { name: 'Change answer' }).waitFor()
  await desktop.getByRole('button', { name: /Mark for review/ }).click()
  await desktop.getByRole('button', { name: 'Questions' }).click()
  await desktop.getByRole('button', { name: 'Review & finish' }).click()
  await desktop.getByRole('heading', { name: 'Review before submitting' }).waitFor()
  await desktop.getByRole('button', { name: 'Submit final answers' }).click()
  await desktop.getByRole('alertdialog').waitFor()
  await desktop.getByRole('button', { name: 'Submit anyway' }).click()
  await desktop.getByText('SESSION COMPLETE', { exact: true }).waitFor()

  // Progress and dark mode.
  await desktop.locator('.app-sidebar').getByRole('button', { name: 'Progress' }).click()
  await desktop.getByRole('heading', { name: 'Build confidence by closing gaps' }).waitFor()
  await desktop.getByText('CATEGORY MASTERY', { exact: true }).waitFor()
  await desktop.getByRole('button', { name: 'Switch to dark theme' }).click()
  const theme = await desktop.evaluate(() => document.documentElement.dataset.theme)
  if (theme !== 'dark') throw new Error('Dark theme did not activate.')

  // Mock exam setup remains available from Home.
  await desktop.locator('.app-sidebar').getByRole('button', { name: 'Home', exact: true }).click()
  await desktop.getByRole('button', { name: /Mock exam/ }).click()
  await desktop.getByRole('heading', { name: 'Build your session' }).waitFor()
  await desktop.getByText('80%', { exact: true }).waitFor()
  await desktop.getByRole('button', { name: 'Start mock exam' }).click()
  await desktop.getByText('Mock exam', { exact: true }).first().waitFor()
  await desktop.getByRole('button', { name: 'Exit session' }).click()
  await desktop.getByRole('button', { name: 'Exit session', exact: true }).last().click()

  // Backup download, validation preview, and protected merge.
  await desktop.locator('.app-sidebar').getByRole('button', { name: 'Data' }).click()
  await desktop.getByRole('heading', { name: 'Move progress between devices' }).waitFor()
  const downloadPromise = desktop.waitForEvent('download')
  await desktop.getByRole('button', { name: 'Export progress' }).click()
  const download = await downloadPromise
  const downloadPath = await download.path()
  if (!downloadPath) throw new Error('Progress export did not create a file.')
  await desktop.locator('input[type="file"]').setInputFiles(downloadPath)
  await desktop.getByText('IMPORT PREVIEW', { exact: true }).waitFor()
  await desktop.getByRole('button', { name: 'Merge progress' }).click()
  await desktop.getByRole('alertdialog').waitFor()
  await desktop.getByRole('button', { name: 'Merge progress', exact: true }).last().click()
  await desktop.getByText('Progress merged successfully.').waitFor()

  // Responsive checks at phone, small phone, tablet, and wide desktop widths.
  for (const [width, height] of [[320, 720], [390, 844], [768, 900], [1680, 1050]]) {
    const page = await browser.newPage({ viewport: { width, height } })
    await page.goto(baseUrl)
    await page.getByRole('heading', { name: 'Ready for your next study session?' }).waitFor()
    await assertNoOverflow(page, `${width}px`)
    if (width <= 720) {
      await page.locator('.mobile-bottom-nav').getByRole('button', { name: 'Browse' }).click()
      await page.getByRole('heading', { name: 'Browse all 192 questions' }).waitFor()
      await assertNoOverflow(page, `${width}px Browse`)
    }
    await page.close()
  }

  console.log('Browser smoke test passed for refreshed navigation, Browse, Progress, sessions, dialogs, backup, dark mode, and responsive layouts.')
} finally {
  await browser.close()
}
