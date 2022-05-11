import parse, { HTMLReactParserOptions, domToReact, Element } from 'html-react-parser';
import React, { isValidElement, FC, ReactNode } from 'react';
import type { IWhiteList } from 'xss';
import { isBlock, wpKsesPost } from '../../dom';
import { IBlockAttributes } from '../blocks/types';

export interface BlockProps {
	test?: (domNode: Element) => boolean;
	tagName?: string;
	classList?: string[] | string;
	domNode?: Element;
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

interface BlockRendererProps {
	html: string;
	ksesAllowList?: IWhiteList;
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

export const BlocksRenderer: FC<BlockRendererProps> = ({ html, ksesAllowList, children }) => {
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
};
