# Contributing and Maintaining

First, thank you for taking the time to contribute!

The following is a set of guidelines for contributors as well as information and instructions around our maintenance process.  The two are closely tied together in terms of how we all work together and set expectations, so while you may not need to know everything in here to submit an issue or pull request, it's best to keep them in the same document.

## Ways to contribute

Contributing isn't just writing code - it's anything that improves the project.  All contributions are managed right here on GitHub. Here are some ways you can help:

### Reporting bugs

If you're running into an issue, please take a look through [existing issues](https://github.com/10up/headless/issues) and [open a new one](https://github.com/10up/headless/issues/new) if needed.  If you're able, include steps to reproduce, environment information, and screenshots/screencasts as relevant.

### Suggesting enhancements

New features and enhancements are also managed via [issues](https://github.com/10up/headless/issues).

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

First and foremost, run `npm install` from the root. Then run `npm run dev` or `npm run dev:multisite`. 

The `npm run dev` command will spin up a single WordPress instance that by default will run at http://localhost:8888 and a the starter Next.js project.

The `npm run dev:multisite` command will spin up a single WordPress instance that by default will run at http://localhost:8888 and the multisite next.js project.


## Troubleshooting

This is a mono repo that leverages [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
If you get a warning about missing files, modules, or packages you should do:

- `npm install` -> get public dependencies
- `npm run build` -> build all dependencies

_if your issues are not mentioned here please open an issue so that we can extend the guides_