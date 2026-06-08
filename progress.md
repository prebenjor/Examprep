Original prompt: Build and deploy a responsive Udemy-style CMDB/CSDM exam-prep app from the supplied Word study notes.

## Completed

- React, TypeScript, and Vite application scaffolded.
- 22 fully structured source questions transcribed with answer explanations.
- Practice mode, mock exam, timer, score results, category analytics, bookmarks, local history, themes, and responsive layouts implemented.
- Question validation, unit tests, README, and GitHub Pages workflow added.

## Source limitation

The document includes 171 screenshots, but only questions 1-22 are represented as complete structured text with choices and explanations. Remaining extracted paragraphs contain concatenated answer-key fragments without dependable prompt-to-answer mapping. They were not invented or silently paired.

## Next content pass

- OCR each screenshot with a reliable OCR tool.
- Compare OCR against screenshots manually.
- Add only fully verified prompts, choices, answers, and explanations.
- Use `needsReview` for source ambiguity and run `npm run validate:questions`.
