import { fetchBlockLibraryStyles } from '../utils/fetchBlockLibraryStyles';
import { HeadstartWPLayout } from '../types';

type BlockLibraryStylesProps = {
	params?: Awaited<HeadstartWPLayout['params']>;
};

/**
 * Loads the WordPress block library CSS into the Next.js application
 *
 * @param params - The parameters for the query.
 */
export const BlockLibraryStyles: React.FC<BlockLibraryStylesProps> = async ({ params = {} }) => {
	const css = await fetchBlockLibraryStyles({ params });

	if (!css) {
		return null;
	}

	return (
		<style
			id="wp-block-library-css"
			type="text/css"
			dangerouslySetInnerHTML={{ __html: css }}
		/>
	);
};
