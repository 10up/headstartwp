/**
 * @10up/block-components (a dependency of packages/block-primitives, accepted as
 * React-18-only for now) bundles a very old, nested @wordpress/block-editor internally.
 * That old copy drags in its own @types/react@18 several levels deep, and npm nests it
 * inside packages/block-primitives/node_modules even though npm's own resolver flags it
 * as invalid against block-primitives' real requirement (@types/react ^19) — a known
 * limitation with npm overrides not reaching very deep transitive chains. Since @types
 * packages are dev-time only (no runtime effect), it's safe to just delete the stray
 * nested copy after every install so TypeScript falls back to the correct, hoisted one.
 */
/**
 * @types/wordpress__block-editor (a community DefinitelyTyped package, still needed since
 * @wordpress/block-editor doesn't ship its own native types) bundles its own old, nested
 * @wordpress/data@9.x. Whether npm actually resolves block-primitives' own '@wordpress/data'
 * import against that stale nested copy instead of the real, hoisted 10.x one turned out to
 * depend on which npm version does the install (reproduced failing under Node 20/npm 10.1,
 * passing under Node 22's bundled npm) - so this can't be relied on to just work everywhere.
 * Deleting the stale nested copy after every install makes resolution consistent regardless.
 */
const fs = require('fs');
const path = require('path');

const staleNestedPaths = [
	['packages', 'block-primitives', 'node_modules', '@types', 'react'],
	['node_modules', '@types', 'wordpress__block-editor', 'node_modules', '@wordpress', 'data'],
];

for (const segments of staleNestedPaths) {
	fs.rmSync(path.join(__dirname, '..', ...segments), { recursive: true, force: true });
}
