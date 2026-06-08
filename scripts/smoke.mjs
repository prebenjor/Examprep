import fs from 'node:fs'
import { chromium } from 'playwright'

const edgePath =
  process.env.BROWSER_PATH ??
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4173/Examprep/'

if (!fs.existsSync(edgePath)) {
  throw new Error(`Browser executable not found: ${edgePath}`)
}

const browser = await chromium.launch({ headless: true, executablePath: edgePath })

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await desktop.goto(baseUrl)
  await desktop.getByText('192', { exact: true }).first().waitFor()
  await desktop.getByRole('button', { name: 'Start practice' }).click()
  await desktop.getByRole('button', { name: /Managed by Group/ }).click()
  await desktop.getByRole('button', { name: /Support Group/ }).click()
  await desktop.getByRole('button', { name: 'Check answer' }).click()
  await desktop.getByText('Correct', { exact: true }).waitFor()
  await desktop.getByRole('button', { name: 'Next' }).click()
  await desktop.getByText('QUESTION 2').waitFor()
  await desktop.locator('.question-grid button').nth(22).click()
  await desktop.getByText('QUESTION 23').waitFor()
  await desktop.locator('.question-image').waitFor()
  const sourceImageLoaded = await desktop.locator('.question-image').evaluate(
    (image) => image.complete && image.naturalWidth > 0,
  )
  if (!sourceImageLoaded) throw new Error('Question 23 source screenshot did not load.')
  await desktop.getByRole('button', { name: 'CMDB Prep home' }).click()
  await desktop.getByRole('button', { name: 'Mock exam', exact: true }).first().click()
  await desktop.getByRole('heading', { name: 'Build your session' }).waitFor()
  await desktop.getByRole('button', { name: 'Start mock exam' }).click()
  await desktop.getByText('MOCK EXAM').first().waitFor()

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await mobile.goto(baseUrl)
  const overflows = await mobile.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  if (overflows) throw new Error('Mobile layout has horizontal overflow.')
  await mobile.getByRole('button', { name: 'Start practice' }).click()
  await mobile.getByText('QUESTION 1').waitFor()

  console.log('Browser smoke test passed for practice, mock exam, and 390px mobile layout.')
} finally {
  await browser.close()
}
