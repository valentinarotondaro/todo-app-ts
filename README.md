# MinTask – Todo App

A todo app built with **TypeScript** and **Vite** for the BDE exam at EASV.
It starts from [Kristian's todo app](https://github.com/kristian-wittrup/2024-todo-TS-app-bde) and adds features, tests and a CI/CD pipeline from [Thomas' exam template](https://github.com/tboulund-bde/ExamTemplate).

- **Live:** https://todo.mintask.dk/live/
- **Test version:** https://todo.mintask.dk/test/

Made by **Valentina Rotondaro** and **Alexa Cattaneo Piazza**.

## Features

| Feature | Option | Module |
| --- | --- | --- |
| Add, edit and remove todos | base app | `todos.ts`, `render.ts` |
| Mark todos as completed | 1 | `features/toggle.ts` |
| Due date + overdue todos | 6 | `features/dueDate.ts` |
| Priority + sort by priority | 7 | `features/priority.ts` |
| Categories + filter by category | 9 | `features/categories.ts` |
| Save todos in localStorage | 14 | `storage.ts` |
| Input validation (empty, max 100 characters, no duplicates) | 16 | `features/validation.ts` |
| Filter by status (All / Active / Completed) | 4 | `features/statusFilter.ts` |

## Tech stack

- TypeScript + Vite
- Vitest (unit tests) with jsdom
- TestCafé (end-to-end tests)
- GitHub Actions (CI/CD) + Simply.com (hosting)

## Getting started

```bash
git clone https://github.com/valentinarotondaro/todo-app-ts.git
cd todo-app-ts
npm install
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the app locally with Vite |
| `npm run build` | Checks the types with `tsc` and builds the app into `dist/` |
| `npm test` | Runs the unit tests with Vitest |

### End-to-end tests (TestCafé)

Start the app in one terminal:

```bash
npm run dev -- --host 127.0.0.1
```

Run the tests in a second terminal:

```bash
BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/
```

Without `BASE_URL`, the tests run against the test version on Simply.com.

## Project structure

```
src/
  main.ts           form and app start
  types.ts          Todo interface and union types (DueStatus, Category, Priority)
  todos.ts          the list of todos (state) + addTodo, removeTodo, editTodo
  storage.ts        saveTodos / loadTodos with localStorage
  render.ts         draws the list in the DOM
  style.css
  features/         one module per feature
test/
  unit/             Vitest tests
  e2e/              TestCafé tests
.github/
  workflows/        CI/CD pipeline
```

## Workflow

- **Gitflow:** `main` (release), `develop` (default branch), `feature/<issue>-<name>` for each feature, `release/*` for the release.
- **GitHub Issues:** one issue per feature with acceptance criteria.
- **Conventional commits:** `feat`, `fix`, `test`, `refactor`, `docs`, `style`, `chore`, `ci`.
- **Pull requests:** every feature goes into `develop` through a PR with `Closes #<issue>`, reviewed by the other team member with the Triple-R method (Request, Rationale, Result).
- **Definition of Done:** issue, branch, small commits, unit tests, at least 2 TestCafé tests, PR with review, green pipeline, branch deleted.

## CI/CD pipeline

`.github/workflows/pipeline.yml` has three jobs:

1. **integration** – installs, builds and runs the unit tests. Runs on every pull request to `develop` and `main`; a PR cannot be merged if it fails.
2. **delivery** – uploads the build to the `/test/` folder on Simply.com.
3. **deployment** – publishes the build to `/live/`.

Delivery and deployment only run on a push to `main` (the release), never on pull requests.
