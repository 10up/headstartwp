#!/bin/bash
#
# Syncs the WordPress plugin's version with the version changesets wrote into
# wp/headless-wp/package.json. Run by `npm run version`.
set -euo pipefail

PLUGIN_FILE="wp/headless-wp/plugin.php"
VERSION=$(node -p "require('./wp/headless-wp/package.json').version")

# Plugin header. Anchored to the docblock's ' * Version:' line specifically, so
# other headers (Requires PHP:, Requires at least:, @version ...) are untouched.
perl -pi -e "s{^(\s*\*\s*Version:).*}{\$1 ${VERSION}}" "$PLUGIN_FILE"

# The PHP constant, matched by name rather than by counting quoted strings.
perl -pi -e "s{(define\(\s*'HEADLESS_WP_PLUGIN_VERSION',\s*')[^']*(')}{\${1}${VERSION}\${2}}" "$PLUGIN_FILE"

# A silent no-match would ship a stale version, so verify both landed.
grep -q "^ \* Version: ${VERSION}$" "$PLUGIN_FILE" \
  || { echo "version-plugin: failed to update the Version header in ${PLUGIN_FILE}" >&2; exit 1; }
grep -q "HEADLESS_WP_PLUGIN_VERSION', '${VERSION}'" "$PLUGIN_FILE" \
  || { echo "version-plugin: failed to update HEADLESS_WP_PLUGIN_VERSION in ${PLUGIN_FILE}" >&2; exit 1; }

echo "version-plugin: ${PLUGIN_FILE} set to ${VERSION}"
