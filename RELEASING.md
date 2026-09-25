# Release Instructions

Releases are automated with [changesets](https://github.com/changesets/changesets) and a single GitHub
Actions workflow, [`.github/workflows/release.yml`](.github/workflows/release.yml). You never bump versions,
edit the plugin header, tag, publish to npm, or write GitHub Releases by hand.

## QA

Before any major or minor release, we will run through our [QA plan](https://docs.google.com/spreadsheets/d/1Ep0FwOnjaXCcZOvrZok9AuEEt1MbPzhk9CLU9KjdG00/edit#gid=0).

## 1. Add a changeset to your PR

Any PR that should ship in a release needs a changeset:

1. Run `npx changeset add`.
2. Select the packages to bump (space to select, enter to continue) and choose major/minor/patch. Include
   `@headstartwp/headstartwp` when the WordPress plugin changes.
3. Write the changelog entry. You can edit it later in `.changeset/<name>.md`.
4. Commit the file with your PR.

The changeset bot comments on PRs without one. The **Release check** workflow dry-runs the version step on
every PR and shows which packages would be released in the run summary.

## 2. What happens on merge

| Branch | npm dist-tag | Plugin repo branch | Release PR title |
| --- | --- | --- | --- |
| `develop` | `next` (prerelease, e.g. `1.7.0-next.0`) | `next` | `Release (next)` |
| `trunk` | `latest` | `trunk` | `Release` |

On every push to `develop` or `trunk`, the Release workflow:

1. **Opens or updates a Release PR** when there are unreleased changesets. The PR contains the version bumps,
   CHANGELOG entries, the synced plugin version (`plugin.php` header and `HEADLESS_WP_PLUGIN_VERSION`, via
   `scripts/version-plugin.sh`) and a refreshed `package-lock.json`. Merge more PRs and it updates itself.
2. **Publishes** once you merge the Release PR:
   - npm packages via trusted publishing, with provenance attestations
   - git tags (`@headstartwp/core@x.y.z`, …) and a GitHub Release per package with its changelog
3. **Releases the WordPress plugin** if `wp/headless-wp/package.json`'s version isn't tagged yet in
   [10up/headstartwp-plugin](https://github.com/10up/headstartwp-plugin): pushes the plugin to that repo,
   tags it (Composer installs from these tags), and creates a `@headstartwp/headstartwp@x.y.z` GitHub
   Release here.
4. **On `trunk` only, opens a `trunk → develop` back-merge PR** after a stable release. Merge it with a
   merge commit.

### Prereleases → stable

1. Merge feature PRs (with changesets) into `develop`. The workflow puts `develop` into prerelease mode
   (`.changeset/pre.json`) and maintains the `Release (next)` PR.
2. Merge `Release (next)` to publish `@next`. Test it.
3. Open a PR from `develop` into `trunk` and merge it. The workflow exits prerelease mode ("promote from
   @next") and opens the `Release` PR with stable versions.
4. Merge `Release` to publish `@latest`, the plugin, and the GitHub Releases.
5. Merge the automated back-merge PR into `develop`.

Hotfixes can go straight to `trunk` with a changeset. The same flow applies from step 4.

## One-time setup (maintainers)

### npm trusted publishing

For each published package (`@headstartwp/core`, `@headstartwp/next`, `@headstartwp/block-primitives`,
`@headstartwp/epio-search`, `@10up/next-redis-cache-provider`), on npmjs.com open **Settings → Trusted
publishing** and add a GitHub Actions publisher:

- Organization or user: `10up`
- Repository: `headstartwp`
- Workflow filename: `release.yml`
- Environment: leave empty

Once every package is configured and a release has published successfully, delete the `NPM_TOKEN`
repository secret. While it exists, the workflow uses it instead of trusted publishing (provenance is still
attached), which makes it a fallback during the switch-over.

### Repository secrets

- `API_GITHUB_TOKEN`: token with write access to `10up/headstartwp-plugin` (plugin push and tags).
- `NPM_TOKEN`: optional, temporary (see above).

`GITHUB_TOKEN` needs **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create
and approve pull requests** enabled, so the workflow can open the Release and back-merge PRs.

### Branch protection

If `trunk` or `develop` requires status checks, PRs opened by `GITHUB_TOKEN` (the Release and back-merge
PRs) don't trigger workflows. Re-run checks by closing and reopening the PR, or pushing an empty commit to
its branch. The "promote from @next" step pushes directly to `trunk`, so `github-actions[bot]` must be
allowed to bypass protection there if direct pushes are restricted.

## Troubleshooting

- **`E404`/`ENEEDAUTH` when publishing:** the trusted publisher on npmjs.com doesn't match (check the
  workflow filename `release.yml` and repository), or a package is missing from the list above.
- **`E422` provenance error:** the package's `repository.url` must point at `github.com/10up/headstartwp`.
- **Plugin didn't release:** its version was already tagged in `10up/headstartwp-plugin`. Add a changeset
  for `@headstartwp/headstartwp`.
- **Re-run a release:** use **Actions → Release → Run workflow** on the branch. Every step is idempotent:
  already-published versions and existing plugin tags are skipped.
