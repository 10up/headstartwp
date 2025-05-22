import { describe, it, expect } from '@jest/globals';

import React from 'react';
import { render } from '@testing-library/react';
import type { IDataWPBlock, HeadlessConfig, ParsedBlock } from '@headstartwp/core';
import { UniversalBlockRenderer } from '../renderer.js';
import type { UniversalBlock } from '#shared/types.js';

interface TestAttributes extends IDataWPBlock {
	content: string;
}

// Mock component for testing
const MockComponent: React.FC<UniversalBlock<TestAttributes>> = ({
	attributes,
	settings = {},
	themeJSON = {},
	children = null,
}) => (
	<div data-testid="mock-component">
		<div data-testid="attributes">{JSON.stringify(attributes)}</div>
		<div data-testid="settings">{JSON.stringify(settings)}</div>
		<div data-testid="theme-json">{JSON.stringify(themeJSON)}</div>
		{children}
	</div>
);

describe('UniversalBlockRenderer', () => {
	const mockBlock: ParsedBlock<TestAttributes> = {
		name: 'test-block',
		className: 'test-class',
		attributes: { content: 'test content' },
	};

	const mockBlockContext = {
		settings: { apiUrl: 'https://example.com' } as HeadlessConfig,
		themeJSON: { colors: { primary: '#000' } },
	};

	it('should return null when block is not provided', () => {
		const { container } = render(
			<UniversalBlockRenderer<TestAttributes>
				block={undefined}
				blockContext={mockBlockContext}
				component={MockComponent}
			/>,
		);
		expect(container.firstChild).toBeNull();
	});

	it('should render component with basic props', () => {
		const { getByTestId } = render(
			<UniversalBlockRenderer<TestAttributes>
				block={mockBlock}
				blockContext={mockBlockContext}
				component={MockComponent}
			/>,
		);

		expect(getByTestId('mock-component')).toBeInTheDocument();
		expect(getByTestId('attributes')).toHaveTextContent(JSON.stringify(mockBlock.attributes));
		expect(getByTestId('settings')).toHaveTextContent(
			JSON.stringify(mockBlockContext.settings),
		);
		expect(getByTestId('theme-json')).toHaveTextContent(
			JSON.stringify(mockBlockContext.themeJSON),
		);
	});

	it('should render children when provided', () => {
		const { getByText } = render(
			<UniversalBlockRenderer<TestAttributes>
				block={mockBlock}
				blockContext={mockBlockContext}
				component={MockComponent}
			>
				<div>Child content</div>
			</UniversalBlockRenderer>,
		);

		expect(getByText('Child content')).toBeInTheDocument();
	});
});
