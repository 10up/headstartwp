import { useEffect } from 'react';
import { domToReact } from 'html-react-parser';
import { isYoutubeEmbed, youtubeEmbedRegex } from '../../dom';
import { IBlock } from '../components';
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
	params?: string;
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
		import('@justinribeiro/lite-youtube');
	}, []);

	if (typeof domNode === 'undefined') {
		return <span>There was an error loading the youtube video</span>;
	}

	const { attribs = {} } = domNode;

	if (typeof attribs?.src === 'undefined' || typeof attribs?.title === 'undefined') {
		if (typeof domNode !== 'undefined') {
			return <>{domToReact([domNode])}</>;
		}
	}

	const { src, title, params } = attribs;

	const videoId = src.match(youtubeEmbedRegex)?.[7];

	if (params) {
		return <lite-youtube videoid={videoId} videotitle={title} params={params} />;
	}

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
