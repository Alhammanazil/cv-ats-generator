# CV ATS Generator

Free, private CV builder that produces ATS-friendly CVs and teaches why each rule exists. Everything runs in the browser: no accounts, no backend, no CV data leaves the device. See [DESIGN.md](DESIGN.md) for the plan.

Live: https://cv-ats-generator-rouge.vercel.app

Stack: Vue 3, Vite, TypeScript, Vue Router, Pinia. UI in Bahasa Indonesia and English.

## Status

Phase 1 (MVP) is built:

- `/` landing with an interactive "what the parser reads" demo
- `/builder` eight-step form, live A4 preview, two single-column templates, rule-based CV checker, export to PDF (browser "Save as PDF", real text), .txt and .json backup/import
- `/belajar` guide: what a CV and ATS are, do/don't, myths vs facts, tips per section, before/after bullets, ready-to-send checklist

Phase 2 (ATS X-ray, keyword matcher, .docx export) and phase 3 (quiz, per-profile examples, polish) are planned in DESIGN.md.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Where things live

- `src/lib/checker.ts`: checker rules (add a rule there, then its `chk.<id>.*` texts in `src/content/ui.ts`)
- `src/lib/format.ts`: date/section formatting and the plain-text export
- `src/content/`: UI strings (`ui.ts`), builder tips (`tips.ts`), Learn page content (`learn.ts`), example CV (`sample.ts`)
- `src/components/CvPreview.vue` + `src/style.css` (`.tpl-*`): the CV templates, also what gets printed

## Deploy

Vercel, static. `vercel.json` rewrites all routes to `index.html` for the SPA router.

## Notes

- The checker is advice, not an official ATS score; every ATS differs.
- Data is saved to `localStorage` only (key `cvats.cv.v1`).
