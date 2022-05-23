import { useEffect } from 'react';
import { isYoutubeEmbed, youtubeEmbedRegex } from '../../dom';

interface LiteYoutube {
	videoid: string;
	videotitle: string;
	playlistid: string;
	videoplay: string;
	videoStartAt: number;
	posterquality: string;
	posterloading: string;
	nocookie: boolean;
	autoload: boolean;
	params: string;
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['lite-youtube']: Partial<LiteYoutube>;
		}
	}
}

/**
 * Renders Youtube embeds with lite-youtube-embed
 *
 * @param {import('@10up/headless-core').BlockDef} props The Block props
 *
 * @returns
 */
export function YoutubeLiteBlock({ domNode }) {
	useEffect(() => {
		import('@justinribeiro/lite-youtube');
	}, []);

	const { src, title } = domNode.attribs;

	const videoId = src.match(youtubeEmbedRegex)[7];

	return <lite-youtube videoid={videoId} videotitle={title} />;
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace YoutubeLiteBlock {
	export const defaultProps = {
		test: (node) => isYoutubeEmbed(node),
	};
}
