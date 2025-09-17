# PropLens Admin Panel

Production-ready admin panel built with Next.js App Router, TypeScript, Tailwind CSS, and Cypress.

This repo implements two responsive screens based on the “Sales admin panel” mock:

- Projects Page (`/projects`): hero section, CTA, existing projects list with cards, SharePoint link footer.
- SOP & Policies Page (`/sop`): simple placeholder page.

## Tech Stack

- Next.js (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Cypress (E2E)
- ESLint + Prettier

## Requirements

- Node.js 18+ (recommended LTS)
- npm 9+ (or use pnpm/yarn with equivalent commands)

## Install

```bash
npm install
```

## Development

Start the local dev server at http://localhost:3000

```bash
npm run dev
```

## Build

Create an optimized production build:

```bash
npm run build
```

## Start (Production)

Serve the production build:

```bash
npm run start
```

## Tests (Cypress)

- Headless run:

```bash
npm run test:e2e
```

- Open Cypress runner:

```bash
npm run cypress:open
```

The included test `cypress/e2e/navigation.cy.ts` verifies navigation between `/projects` and `/sop`.

## Project Structure

```
app/
  layout.tsx        # App shell with Sidebar + Topbar
  globals.css       # Tailwind base styles
  page.tsx          # Redirects / -> /projects
  projects/page.tsx # Projects page UI
  sop/page.tsx      # SOP & Policies placeholder
components/
  Sidebar.tsx
  Topbar.tsx
  ProjectCard.tsx
cypress/
  e2e/navigation.cy.ts
```

## Notes on UI

- Desktop layout targets 1440px widths and up.
- Mobile layout (375px) collapses the sidebar into a top-button-triggered drawer.
- Primary CTA: “Add New Project”.
- SharePoint link in the footer is a disabled input placeholder.

## Linting & Formatting

```bash
npm run lint
```

Prettier configuration is provided via `.prettierrc`.

## License

MIT