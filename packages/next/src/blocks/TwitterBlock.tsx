import { isTwitterEmbed } from '@10up/headless-core';
import Script from 'next/script';

/**
 * Renders a twitter embed
 *
 * @param props Link Block Props
 * @param props.domNode The domNode element
 * @param props.children Children prop
 *
 * @returns
 */
export function TwitterBlock({ children }) {
	return (
		<>
			<Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />

			{children}
		</>
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace TwitterBlock {
	export const defaultProps = {
		test: (node) => isTwitterEmbed(node),
	};
}
