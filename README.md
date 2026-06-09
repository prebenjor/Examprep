# CMDB / CSDM Exam Prep

A responsive, offline-friendly study app built from the supplied CMDB/CSDM study notes. It provides immediate-feedback practice, randomized mock exams, score percentages, category breakdowns, bookmarks, review flags, and device-local history. The app pass mark is 80%.

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run validate:questions
npm test
npm run lint
npm run build
npm run smoke # while the local preview is running on port 4173
```

## Question data

Questions live in `src/data/questions.ts` and conform to the `Question` interface in `src/types.ts`.

Each entry requires:

- A unique `id` and source `number`
- Category and question type
- Prompt and at least one choice
- One or more valid choice IDs in `correctAnswers`
- An explanation
- Optional `image` and `needsReview` fields

Run `npm run validate:questions` after changing the bank. The validator rejects duplicate IDs, missing fields, missing choices, and answers that do not reference a choice.

The bank contains all 192 source questions: 22 structured questions and 170 transcribed questions. Questions and choices are presented as readable text; original screenshots are retained under an optional **View original source** disclosure for verification. Ambiguous source items are marked `needsReview`.

## Progress and privacy

Attempts, bookmarks, review flags, theme, and completed-question statistics are stored in browser `localStorage`. Data stays on the current device and does not synchronize between browsers or devices.

The repository and deployed question bank are public.

## Deployment

Vite uses `/Examprep/` as its production base path. `.github/workflows/deploy.yml` validates, tests, builds, and deploys the `dist` folder to GitHub Pages whenever `main` is updated.

In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**. The deployed URL is:

`https://prebenjor.github.io/Examprep/`
