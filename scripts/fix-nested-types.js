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
const fs = require('fs');
const path = require('path');

const staleTypesPath = path.join(
	__dirname,
	'..',
	'packages',
	'block-primitives',
	'node_modules',
	'@types',
	'react',
);

fs.rmSync(staleTypesPath, { recursive: true, force: true });
