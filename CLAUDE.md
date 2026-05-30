# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev                  # start dev server
pnpm build                # production build
pnpm lint                 # check with Biome
pnpm lint:fix             # auto-fix lint issues
pnpm format               # format all files with Biome
pnpm validate:typecheck   # TypeScript type-check (no emit)
```

### Database

```bash
docker compose up -d                    # start Postgres (petshop-db on port 5432)
pnpm prisma migrate dev                 # apply migrations and regenerate client
pnpm prisma migrate dev --name <name>   # create a new named migration
pnpm prisma studio                      # open Prisma Studio GUI
```

## Architecture

This is a **Next.js 16 App Router** project (Next.js 16 has breaking changes — consult `node_modules/next/dist/docs/` before writing any Next.js-specific code).

**Stack:**
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (PostCSS plugin, no `tailwind.config.js`)
- shadcn/ui — components go in `src/components/ui/`, add them with `pnpm dlx shadcn@latest add <component>`
- Prisma 7 for ORM — client is generated into `src/generated/prisma/` (not the default location)
- Biome for linting and formatting (replaces ESLint + Prettier)
- Lefthook for git hooks: formats staged files on pre-commit, type-checks on pre-push
- PostgreSQL via Docker (`docker-compose.yml`), credentials in `.env`

**Key structural points:**
- App lives under `src/app/` using the App Router file conventions (`layout.tsx`, `page.tsx`, etc.)
- `src/lib/utils.ts` exports the `cn()` helper (clsx + tailwind-merge) — always use it for conditional classes
- shadcn uses `.dark` class for dark mode (not `prefers-color-scheme`); add `next-themes` if a theme toggle is needed
- `components.json` at the root configures the shadcn CLI paths and style (`new-york`, neutral base color)
- Prisma client output is `src/generated/prisma` — import from there, not from `@prisma/client`
- `prisma.config.ts` at the root configures the schema path and loads `DATABASE_URL` via `dotenv`
- No test suite is configured yet

## Code Style

Biome enforces these non-default rules:
- `noExplicitAny` → error
- `useImportType` → error (always use `import type` for type-only imports)
- `noNonNullAssertion` → warn
- Single quotes, 2-space indent, 100-char line width, trailing commas (ES5)
- Imports are auto-organized by Biome assist
