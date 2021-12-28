import parse, { HTMLReactParserOptions, DOMNode, domToReact, Element } from 'html-react-parser';
import React, { isValidElement, PropsWithChildren, ReactNode } from 'react';
import wp_kses_post, { ksesAllowedAttributes, ksesAllowedTags } from '../../utils/wpKsesPost';

export interface BlockDef {
	test: (domNome: DOMNode) => boolean;
	domNode: DOMNode;
	children?: ReactNode | undefined;
}

type BlocksRendererProps = PropsWithChildren<{ html: string }>;

export const BlocksRenderer = ({ html, children }: BlocksRendererProps) => {
	const blocks: ReactNode[] = React.Children.toArray(children);

	// Check if components[] has a non-ReactNode type Element
	const hasInvalidComponent: boolean =
		blocks.findIndex((block) => !isValidElement(block) || !('test' in block.props)) !== -1;

	if (hasInvalidComponent) {
		console.warn('Children of <BlocksRenderer /> component should be a type of ReactNode');
	}

	const cleanedHTML = wp_kses_post(html, ksesAllowedTags, ksesAllowedAttributes);

	const options: HTMLReactParserOptions = {
		replace: (domNode) => {
			let component = null;

			blocks.forEach((block) => {
				if (isValidElement<BlockDef>(block) && block.props.test(domNode)) {
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

	return parse(cleanedHTML, options);
};
