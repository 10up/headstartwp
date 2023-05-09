import { useEffect } from 'react';
import { isYoutubeEmbed, youtubeEmbedRegex } from '../../dom';
import { IBlock } from '../components';
import { useBlock } from './hooks';
import { IBlockAttributes } from './types';

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

export interface YoutubeLiteBlockProps extends IBlockAttributes {
	src: string;
	title: string;
}

export interface IYoutubeLiteBlock extends IBlock<YoutubeLiteBlockProps> {}
/**
 * Renders Youtube embeds with lite-youtube-embed
 *
 * @param {import('@headstartwp/core').BlockDef} props The Block props
 *
 * @returns
 */
export function YoutubeLiteBlock({ domNode }: Omit<IYoutubeLiteBlock, 'component'>) {
	useEffect(() => {
		// import('@justinribeiro/lite-youtube');
	}, []);

	const { attributes } = useBlock<YoutubeLiteBlockProps>(domNode);

	const { src, title } = attributes;

	const videoId = src.match(youtubeEmbedRegex)?.[7];

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
