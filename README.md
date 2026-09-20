# MiniGames

MiniGames is a responsive single-page application for discovering cozy games.
It is built for the RS School MiniGames qualification project with plain
TypeScript, semantic HTML, and SCSS.

## Scripts

- `npm run dev` — start the Vite development server.
- `npm run build` — type-check and create a production build.
- `npm run preview` — preview the production build.
- `npm run lint` — run ESLint with zero allowed warnings.
- `npm run format` — format the project with Prettier.
- `npm run format:check` — verify Prettier formatting.
- `npm run check` — run formatting, linting, and production build checks.

## Project structure

```text
src/
  app/          # application bootstrap and global state
  components/   # reusable UI components
  data/         # static Story 1 data
  pages/        # page composition
  styles/       # SCSS tokens, mixins, and global styles
  types/        # shared TypeScript types
  utils/        # framework-independent helpers
```

## Branch workflow

Story work starts from a `story-N` branch. Each focused feature is developed
on a feature branch, reviewed through a pull request into `story-N`, then
merged. The final story pull request is opened against the preceding branch
and remains unmerged for Cross-Check review.
