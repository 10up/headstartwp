/* eslint-disable */

// #region test-function

import {
	BlocksRenderer,
	isAnchorTag,
	BlocksRenderer,
	isAnchorTag,
	isImageTag,
} from '@10up/headless-core';

const MyLinkBlock = ({ domNode, children }) => {
	// get the html attributes from the dom node
	const { href, rel } = domNode.attribs;

	return (
		<MyFrameWorkSpecificLinkComponent href={href} rel={rel}>
			{children}
		</MyFrameWorkSpecificLinkComponent>
	);
};

export const Blocks = ({ html }) => {
	return (
		<BlocksRenderer html={html}>
			<MyLinkBlock test={(node) => isAnchorTag(node, { isInternalLink: true })} />
		</BlocksRenderer>
	);
};

// #endregion test-function

// #region props

import {
	BlocksRenderer,
	BlocksRenderer,
	isAnchorTag,
	isImageTag,
} from '@10up/headless-core';

const MyLinkBlock = ({ domNode, children }) => {
	// get the html attributes from the dom node
	const { href, rel } = domNode.attribs;

	return (
		<MyFrameWorkSpecificLinkComponent href={href} rel={rel}>
			{children}
		</MyFrameWorkSpecificLinkComponent>
	);
};

export const Blocks = ({ html }) => {
	return (
		<BlocksRenderer html={html}>
			<MyLinkBlock tagName="a" classList="my-special-anchor" />
		</BlocksRenderer>
	);
};

// #endregion props
