import { HeadstartWPLayout } from '../types';
import { prepareQuery } from '../data/queries/prepareQuery';

/**
 * Fetch the block library styles from the WordPress site.
 *
 * @param params - The parameters for the query.
 *
 * @returns The block library styles.
 */
export async function fetchBlockLibraryStyles({
	params,
}: {
	params: Awaited<HeadstartWPLayout['params']>;
}) {
	const { config } = await prepareQuery({
		routeParams: params,
	});

	if (!config.sourceUrl) {
		return '';
	}

	try {
		const blockLibraryCss = await fetch(
			`${config.sourceUrl}/wp-includes/css/dist/block-library/style.min.css`,
			{ cache: 'force-cache', next: { revalidate: 60 * 60 * 24 } },
		);
		const blockLibraryCssText = await blockLibraryCss.text();
		return blockLibraryCssText;
	} catch (error) {
		return '';
	}
}
