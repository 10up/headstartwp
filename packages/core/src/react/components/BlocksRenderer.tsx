import parse, { HTMLReactParserOptions, DOMNode, domToReact, Element } from 'html-react-parser';
import React, { isValidElement, FC, ReactNode, ReactElement } from 'react';
import type { IWhiteList } from 'xss';
import { wpKsesPost } from '../../dom';

export interface BlockProps {
	test: (domNome: DOMNode) => boolean;
	domNode?: DOMNode;
	children?: ReactNode | undefined;
}

interface BlockRendererProps {
	html: string;
	ksesAllowList?: IWhiteList;
	children?: ReactElement<BlockProps> | null;
}

export const BlocksRenderer: FC<BlockRendererProps> = ({ html, ksesAllowList, children }) => {
	const blocks: ReactNode[] = React.Children.toArray(children);

	// Check if components[] has a non-ReactNode type Element
	const hasInvalidComponent: boolean =
		blocks.findIndex(
			(block) => !isValidElement<BlockProps>(block) || !('test' in block.props),
		) !== -1;

	if (blocks.length > 1 && hasInvalidComponent) {
		console.warn(
			'Children of <BlocksRenderer /> component should be a type of ReactElement<BlockProps>',
		);
	}

	const cleanedHTML = wpKsesPost(html, ksesAllowList);

	const options: HTMLReactParserOptions = {
		replace: (domNode) => {
			let component: ReactNode = null;

			blocks.forEach((block) => {
				if (isValidElement<BlockProps>(block) && block.props.test(domNode)) {
					component = React.createElement(
						block.type,
						{
							...block.props,
							domNode,
						},
						domNode instanceof Element ? domToReact(domNode.children, options) : null,
					);
				}
			});

			return component;
		},
	};

	return <>{parse(cleanedHTML, options)}</>;
};

BlocksRenderer.defaultProps = {
	ksesAllowList: undefined,
	children: null,
};
