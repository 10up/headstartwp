/**
 * Webpack-compatible loader that injects the HeadstartWP config bootstrap into a module.
 *
 * This loader is intentionally dependency-free and only accepts plain JSON options so that it can
 * be executed both by webpack and by Turbopack's `loader-runner` based implementation
 * (see the `turbopack.rules` entries emitted by `withHeadstartWPConfig`).
 */

import path from 'path';

export interface InjectHeadstartWPConfigLoaderOptions {
	/**
	 * Absolute (posix normalized) path to the headstartwp config file to inject.
	 */
	configPath: string;
}

interface LoaderContext {
	getOptions: () => InjectHeadstartWPConfigLoaderOptions;
	/**
	 * Absolute path of the module being transformed.
	 */
	resourcePath?: string;
}

const MARKER = '__setHeadstartWPConfig';

/**
 * Length of the leading directive prologue (`'use client'`, `'use server'`, `'use strict'`, …).
 *
 * The injected code must be placed *after* the prologue, otherwise the directives stop being
 * directives and Next.js no longer treats the module as a client/server module.
 *
 * @param source the module source
 * @returns the offset at which the injected code should be inserted
 */
export function getDirectivePrologueEnd(source: string): number {
	// matches leading comments/whitespace followed by a quoted directive and an optional semicolon
	const directive = /^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*(['"])use [a-z-]+\1\s*;?/;

	let offset = 0;

	for (;;) {
		const match = directive.exec(source.slice(offset));

		if (!match) {
			return offset;
		}

		offset += match[0].length;
	}
}

/**
 * Turns an absolute config path into a specifier that is resolvable from the importing module.
 *
 * Turbopack resolves a leading `/` against the project root rather than the filesystem root, so
 * the injected import has to be relative to the module it is injected into.
 *
 * @param configPath absolute path to the config file
 * @param resourcePath absolute path of the module the config is injected into
 * @returns the import specifier to use
 */
export function toRelativeSpecifier(configPath: string, resourcePath?: string): string {
	if (!resourcePath) {
		return configPath;
	}

	const relative = path
		.relative(path.dirname(resourcePath), configPath)
		.replace(/\\/g, '/');

	return relative.startsWith('.') ? relative : `./${relative}`;
}

/**
 * Builds the source that bootstraps the headstartwp config.
 *
 * @param configPath path to the config file to import
 * @returns the source to inject
 */
export function buildConfigPrelude(configPath: string): string {
	return [
		'',
		`import { setHeadstartWPConfig as ${MARKER} } from '@headstartwp/core/utils';`,
		`import __headstartwpConfig from '${configPath}';`,
		`${MARKER}(__headstartwpConfig);`,
		'',
	].join('\n');
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function injectHeadstartWPConfigLoader(
	this: LoaderContext,
	source: string,
): string {
	const { configPath } = this.getOptions() ?? {};

	if (!configPath || source.includes(MARKER)) {
		return source;
	}

	const offset = getDirectivePrologueEnd(source);
	const specifier = toRelativeSpecifier(configPath, this.resourcePath);

	return source.slice(0, offset) + buildConfigPrelude(specifier) + source.slice(offset);
}
