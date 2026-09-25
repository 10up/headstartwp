# Contributing and Maintaining

First, thank you for taking the time to contribute!

The following is a set of guidelines for contributors as well as information and instructions around our maintenance process.  The two are closely tied together in terms of how we all work together and set expectations, so while you may not need to know everything in here to submit an issue or pull request, it's best to keep them in the same document.

## Ways to contribute

Contributing isn't just writing code - it's anything that improves the project.  All contributions are managed right here on GitHub. Here are some ways you can help:

### Reporting bugs

If you're running into an issue, please take a look through [existing issues](https://github.com/10up/headstartwp/issues) and [open a new one](https://github.com/10up/headstartwp/issues/new) if needed.  If you're able, include steps to reproduce, environment information, and screenshots/screencasts as relevant.

### Suggesting enhancements

New features and enhancements are also managed via [issues](https://github.com/10up/headstartwp/issues).

### Pull requests

Pull requests represent a proposed solution to a specified problem.  They should always reference an issue that describes the problem and contains discussion about the problem itself.  Discussion on pull requests should be limited to the pull request itself, i.e. code review.

For more on how 10up writes and manages code, check out our [10up Engineering Best Practices](https://10up.github.io/Engineering-Best-Practices/).

## Workflow

The `develop` branch is the development branch which means it contains the next version to be released. `trunk` contains the latest released version.  Always work on the `develop` branch and open up PRs against `develop`.

## Getting set up

### System requirements

- [Node.js](https://nodejs.org/) >= 16.0.0.
- [PHP](https://www.php.net/) >= 8.0.
- [Docker](https://www.docker.com/)

## Get the project running

First and foremost, run `npm install` from the root.

- `npm run build` builds every package under `packages/`.
- `npm run dev` watches and rebuilds all packages and starts the local WordPress instance (via `wp-env`)
  at http://localhost:8888.
- `npm run test` runs the package unit tests.

`npm install` also installs the Git hooks through Vite+ (`vp config`, run by the root `prepare` script).
The hooks live in `.vite-hooks/`: `pre-commit` runs `vp staged` (the `staged` block in `vite.config.ts`)
and `commit-msg` runs commitlint. To skip them for one commit use `VP_GIT_HOOKS=0 git commit ...`; to turn
them off in your clone run `npx vp hooks disable` (and `npx vp hooks enable` to turn them back on).

### Testing changes against a real front end

As of 1.8.0 this repository no longer contains example or starter Next.js projects. Their knowledge now
lives in [`prds/`](./prds/README.md) as PRDs an LLM can use to stand up an equivalent project.

To exercise a package change end to end:

1. Generate a throwaway project **outside this repo** from the relevant PRD (for example
   `prds/app-router-starter.md`), pointing it at `http://localhost:8888`.
2. Point its HeadstartWP dependencies at your local build, e.g.
   `npm install ../headstartwp/packages/core ../headstartwp/packages/next`.
3. Keep `npm run dev` running here so the packages rebuild as you edit.

If your change alters how projects should be wired (new config options, route handlers, conventions),
update the affected PRDs in the same pull request.

## Troubleshooting

This is a mono repo that leverages [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
If you get a warning about missing files, modules, or packages you should do:

- `npm install` -> get public dependencies
- `npm run build` -> build all dependencies

_if your issues are not mentioned here please open an issue so that we can extend the guides_