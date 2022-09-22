import parse, { HTMLReactParserOptions, domToReact, Element } from 'html-react-parser';
import React, { isValidElement, ReactNode } from 'react';
import type { IWhiteList } from 'xss';
import { isBlock, wpKsesPost } from '../../dom';
import { IBlockAttributes } from '../blocks/types';

/**
 * The interface any children of {@link BlocksRenderer} must implement.
 */
export interface BlockProps {
	/**
	 * A test function receives a domNode and returns a boolean valua indicating
	 * whether that domNode should be replaced with the react component
	 */
	test?: (domNode: Element) => boolean;

	/**
	 * An optional exclude function that also receives a domNode and is executed against every child
	 * of the node being replaced with a react component.
	 *
	 * This is useful to selectively disregard certain children of a node when replacing with a react component.
	 */
	exclude?: (childNode: Element) => boolean;

	/**
	 * The tag name of the domNode that should be replaced with the react component
	 *
	 * If a test function is not supplied, then passing tagName is mandatory
	 */
	tagName?: string;

	/**
	 * The class name of the domNode that should be replaced with the react component
	 *
	 * If tagName is specified, then classList is mandatory
	 */
	classList?: string[] | string;

	/**
	 * The actual domNode that was replaced with the react component
	 */
	domNode?: Element;

	/**
	 * The children of the domNode that was replaced with the react component
	 *
	 * Note: the children of the domNode are recursively parsed.
	 */
	children?: ReactNode | undefined;
}

/**
 * The common interface for a block transform component
 */
export interface IBlock<T extends IBlockAttributes> extends Omit<BlockProps, 'test'> {
	domNode: Element;
	className?: string;
	component: React.FC<T>;
}

/**
 * The type definition for the [[BlocksRenderer]] component.
 */
export interface BlockRendererProps {
	/**
	 * The HTML string to be parsed.
	 *
	 * ```
	 * <BlocksRenderer
	 *		html="<div><p>hello world</p> div content</div>"
	 * />,
	 * ```
	 */
	html: string;

	/**
	 * The allow list for the parser
	 *
	 * ```
	 * <BlocksRenderer
	 *		html="<div><p>hello world</p> div content</div>"
	 *		ksesAllowList={{ div: [] }}
	 * />,
	 * ```
	 */
	ksesAllowList?: IWhiteList;

	/**
	 * The children components that must implements {@link BlockProps}. Failing to implement {@link BlockProps}
	 * will issue a warning at runtime.
	 *
	 * Passing children are not mandatory, if you do not pass them `BlocksRenderer` will simply sanitize the html markup.
	 */
	children?: ReactNode;
}

const shouldReplaceWithBlock = (block: ReactNode, domNode: Element) => {
	if (!isValidElement<BlockProps>(block)) {
		return false;
	}

	const { test: testFn, tagName, classList } = block.props;
	const hasTestFunction = typeof testFn === 'function';

	if (hasTestFunction) {
		return testFn(domNode);
	}

	if (typeof tagName === 'string' && typeof classList !== 'undefined') {
		return isBlock(domNode, { tagName, className: classList });
	}

	return false;
};

/**
 * The `BlocksRenderer` components provides an easy way to convert HTML markup into corresponding
 * React components.
 *
 * The `BlocksRenderer` component takes in arbitrary html markup and receives a list of react components
 * as children that allows replacing dom nodes with React Components.
 *
 * The html prop is sanitized through [[wpKsesPost]] so it's safe for rendering arbitrary html markup.
 *
 * The children components must implement the [[BlockProps]] interface
 *
 * ## Usage
 *
 * ### Usage with the test function
 *
 * {@codeblock ~~/examples/core/BlocksRenderer.tsx#test-function}
 *
 * ### Usage with classList and tagName props
 *
 * {@codeblock ~~/examples/core/BlocksRenderer.tsx#props}
 *
 * @param props Component properties
 *
 * @category React Components
 */
export function BlocksRenderer({ html, ksesAllowList, children }: BlockRendererProps) {
	const blocks: ReactNode[] = React.Children.toArray(children);

	// Check if components[] has a non-ReactNode type Element
	// const hasInvalidComponent: boolean = blocks.findIndex((block) => !isValidElement(block)) !== -1;
	const hasInvalidComponent: boolean =
		blocks.findIndex((block) => {
			if (!isValidElement<BlockProps>(block)) {
				return true;
			}

			const { test: testFn, tagName, classList } = block.props;
			const hasTestFunction = typeof testFn === 'function';

			// if has a test function component is not invaldi
			if (hasTestFunction) {
				return false;
			}

			// if does not have a test function it must have tagName and classList
			// if it does then it is not invalid
			if (typeof tagName !== 'undefined' && typeof classList !== 'undefined') {
				return false;
			}

			// otherwise it is invalid
			return true;
		}) !== -1;

	if (hasInvalidComponent) {
		console.warn(
			'Children of <BlocksRenderer /> component should be a type of ReactNode<BlockProps>',
		);
	}

	const cleanedHTML = wpKsesPost(html, ksesAllowList);

	const options: HTMLReactParserOptions = {
		replace: (domNode) => {
			let component: ReactNode = null;

			blocks.forEach((block) => {
				if (
					isValidElement<BlockProps>(block) &&
					shouldReplaceWithBlock(block, domNode as Element)
				) {
					component = React.createElement(
						block.type,
						{
							...block.props,
							domNode,
						},
						(domNode as Element)?.children
							? domToReact((domNode as Element)?.children, {
									// eslint-disable-next-line react/no-unstable-nested-components
									replace: (childNode) => {
										if (typeof options.replace !== 'function') {
											return undefined;
										}

										if (
											typeof block.props.exclude === 'function' &&
											block.props.exclude(childNode as Element)
										) {
											// eslint-disable-next-line react/jsx-no-useless-fragment
											return <></>;
										}

										return options.replace(childNode);
									},
							  })
							: null,
					);
				}
			});

			return component;
		},
	};

	return <>{parse(cleanedHTML, options)}</>;
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace BlocksRenderer {
	export const defaultProps = {
		ksesAllowList: undefined,
	};
}
