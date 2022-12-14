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

## Get the project running
TBD

## Troubleshooting

This is a mono repo that leverages [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
If you get a warning about missing files, modules, or packages you should do:

- `npm install` -> get public dependencies
- `npm run build` -> build all dependencies

_if your issues are not mentioned here please open an issue so that we can extend the guides_
## Release instructions

We use [changesets](https://github.com/changesets/changesets) to manage changelogs and releases. 

When creating a PR that should trigger a release you should include a changeset within your PR.

To include a changeset follow these steps:

1. Run `npx changeset add`
2. Follow the prompts, the CLI will ask you to select which packages should have a major, minor and patch bump. Use *space* to select the packages and hit *enter* to go to the next step. To skip a prompt (e.g if you changes do not require a major bump) just hit *enter* without selecting a package.
3. Enter a short message describing the changes. You can always change the changelog entry by editing the newly created file in `.changesets/[name].md`
4. Add the changesets to your PR (`git add`), commit and push.

A github bot will check if you PR include a changeset file. If it doesn't you will be warned in the PR.

### @next releases

Whenever a PR is merged to the `develop` branch, if it contains a changeset a new PR will be opened automatically against `develop` to bump versions and push to `npm` under the `next` tag. Merging this PR opened by `changeset` will trigger the release flow.

You do not need to release a new version to NPM on every PR that is merged, you can batch as many PRs as you want. For stable releases though, typically we'd only merge `develop` into `trunk` once we're ready for a new stable release.

Here's a summary of the process
1. Merge a PR with changesets files into `develop`
2. Wait for `changeset` to open a new PR called `Release (next)`.
3. Optionally merge more PRs into `develop` if you want to include other changes in the same release. Doing so will update the `Release (next)` PR automatically.
4. Merge the PR opened by `changeset` into `develop`.
5. A new release under the `next` tag will be pushed to npm.
6. A new Github Release with the changelog will be created automatically.

### Stable releases

Whenever a PR is merged to the `trunk` branch, if it contains a changeset a new PR will be opened automatically against `trunk` to bump versions and push to `npm` under the `latest` tag. Merging this PR opened by `changeset` will trigger the release flow.

To promote a next release to a stable release, first make sure to release the `@next` version by merging the `Release (@next)` PR opened by changeset. Then open a PR from `develop` against `trunk` and merge the `Release` PR into `trunk`.

After a new stable version has been released, merge `trunk` back into `develop`.

Here's a summary of the process
1. Follow the process to create a `next` release and test that the release is good to go.
2. Merge `develop` into `trunk`.
2. Wait for `changeset` to open a new PR called `Release`.
4. Merge the PR opened by `changeset` into `trunk`.
5. A new release under the `latest` tag will be pushed to npm.
6. Merge `trunk` back into `develop`.
7. A new Github Release with the changelog will be created automatically.