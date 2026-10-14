# Repository Guidelines

## Project Structure & Module Organization

This salon website uses Next.js 16, React 19, TypeScript, and Tailwind CSS 4.
- `app/page.tsx` contains the homepage, galleries, and booking enquiry flow.
- `app/layout.tsx` and `app/globals.css` define the shared layout and styles.
- `components/` contains shared components; `components/ui/` holds UI primitives.
- `lib/` contains utilities and booking provider configuration.
- `public/assets/` stores images and video, referenced as `/assets/...`.

## Build, Test, and Development Commands

Use pnpm and keep `pnpm-lock.yaml` updated when dependencies change.
- `pnpm install`: install dependencies.
- `pnpm dev`: start local development.
- `pnpm build`: create a production build.
- `pnpm start`: serve the production build after building.
- `pnpm lint`: run ESLint with Next.js and TypeScript rules.
- `pnpm typecheck`: check TypeScript without emitting files.
- `pnpm format`: format TypeScript and TSX files across the repository.

## Coding Style & Naming Conventions

Follow `.prettierrc`: two-space indentation, double quotes, no semicolons, LF endings, and an 80-column target. The Prettier Tailwind plugin sorts utility classes. Use strict TypeScript, PascalCase component names, camelCase functions and variables, and descriptive kebab-case module filenames such as `booking-config.ts`. Prefer the `@/` alias for imports from the repository root. Keep reusable UI in `components/` and shared logic in `lib/`.

## Testing Guidelines

No automated test framework, test script, or coverage threshold is currently configured. Before submitting changes, run lint, typecheck, and build. Manually check desktop and mobile layouts, booking step validation, gallery navigation, dialog keyboard focus, and Escape dismissal. Include reproduction and verification steps in the PR. If introducing automated tests, document the runner and command; use descriptive `*.test.ts` or `*.test.tsx` filenames.

## Commit & Pull Request Guidelines

The available history uses `feat: initial commit`. Follow this concise prefix style, for example `fix: validate booking contact details`. Keep commits focused. PRs should explain the change, link relevant issues, list verification results, and include screenshots for visual changes.

## Configuration & Agent Instructions

Keep secrets out of Git; `.env*` files are ignored. `NEXT_PUBLIC_SIMPLYBOOK_ACCOUNT_URL` is public configuration; verify the account before enabling live booking. Read relevant installed guides in `node_modules/next/dist/docs/` before changing Next.js code. Use Context7 for current library and API documentation.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
