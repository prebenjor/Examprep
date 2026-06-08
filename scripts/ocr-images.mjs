import fs from 'node:fs/promises'
import path from 'node:path'
import { createWorker } from 'tesseract.js'

const sourceDir = path.resolve('.work/processed')
const outputPath = path.resolve('.work/ocr-results.json')
const files = (await fs.readdir(sourceDir))
  .filter((file) => file.endsWith('.png'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

let nextIndex = 0
const results = []

async function runWorker() {
  const worker = await createWorker('eng')
  try {
    while (nextIndex < files.length) {
      const index = nextIndex
      nextIndex += 1
      const file = files[index]
      const { data } = await worker.recognize(path.join(sourceDir, file))
      results.push({
        file,
        confidence: Math.round(data.confidence * 10) / 10,
        text: data.text.trim(),
      })
      console.log(`${index + 1}/${files.length} ${file} ${Math.round(data.confidence)}%`)
    }
  } finally {
    await worker.terminate()
  }
}

await Promise.all(Array.from({ length: 4 }, () => runWorker()))
results.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
await fs.writeFile(outputPath, JSON.stringify(results, null, 2))
console.log(`Wrote ${results.length} OCR records to ${outputPath}`)
