import { render } from '@testing-library/react';
import { DOMNode, domToReact, Element } from 'html-react-parser';
import React, { ReactElement } from 'react';
import { isAnchorTag } from '../../../dom';
import { SettingsProvider } from '../../provider';
import { BlocksRenderer } from '../BlocksRenderer';
import type { BlockProps } from '../BaseBlocksRenderer';

describe('BlocksRenderer', () => {
	it('renders html properly', () => {
		const { container } = render(<BlocksRenderer html="<div><p>hello world</p></div>" />);
		expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <p>
          hello world
        </p>
      </div>
    `);
	});

	it('sanitizes html', () => {
		const { container } = render(
			<BlocksRenderer html="<div><p><script>alert()</script>hello world</p></div>" />,
		);
		expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <p>
          hello world
        </p>
      </div>
    `);
	});

	it('sanitizes html respecting ksesAllowList', () => {
		const { container } = render(
			<BlocksRenderer
				html="<div><p>hello world</p> div content</div>"
				ksesAllowList={{ div: [] }}
			/>,
		);
		expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
         div content
      </div>
    `);
	});

	it('replaces markup with react components', () => {
		const DivToP = ({ domNode, children }: BlockProps) => {
			const className =
				domNode instanceof Element ? domNode?.attribs.class || undefined : undefined;
			return <p className={className}>{children}</p>;
		};

		const { container } = render(
			<BlocksRenderer html="<div class='my-class'>This Will Become a p tag</div><div>This Will Become a p tag</div>">
				<DivToP
					test={(node: DOMNode) => {
						if (!(node instanceof Element)) {
							return false;
						}
						return node.type === 'tag' && node.name === 'div';
					}}
				/>
			</BlocksRenderer>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="my-class"
        >
          This Will Become a p tag
        </p>
        <p>
          This Will Become a p tag
        </p>
      </div>
    `);
	});

	it('replaces markup with react components without test function', () => {
		const DivToP = ({ domNode, children }: BlockProps) => {
			const className =
				domNode instanceof Element ? domNode?.attribs.class || undefined : undefined;
			return <p className={className}>{children}</p>;
		};

		const { container } = render(
			<BlocksRenderer html="<div class='my-class'>This Will Become a p tag</div><div>This Will not Become a p tag</div>">
				<DivToP tagName="div" classList={['my-class']} />
			</BlocksRenderer>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="my-class"
        >
          This Will Become a p tag
        </p>
        <div>
          This Will not Become a p tag
        </div>
      </div>
    `);
	});

	it('replaces markup with react components and remove children nodes', () => {
		const DivToP = ({ domNode, children }: BlockProps) => {
			const className =
				domNode instanceof Element ? domNode?.attribs.class || undefined : undefined;
			return <p className={className}>{children}</p>;
		};

		const { container } = render(
			<BlocksRenderer html="<div class='my-class'>This Will Become a p tag<pre>this will be removed</pre></div><div>This Will not Become a p tag</div>">
				<DivToP
					tagName="div"
					classList={['my-class']}
					exclude={(node) => node.name === 'pre'}
				/>
			</BlocksRenderer>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="my-class"
        >
          This Will Become a p tag
        </p>
        <div>
          This Will not Become a p tag
        </div>
      </div>
    `);
	});

	it('passes the current site to test function', () => {
		const InternalLink: React.FC<BlockProps> = () => {
			return <p>INTERNAL LINK</p>;
		};

		const { container } = render(
			<SettingsProvider settings={{ sourceUrl: 'https://sourceurl.com/site1' }}>
				<BlocksRenderer html="<a href='https://sourceurl.com/site1/post-name'>link</a><a href='https://sourceurl.com/site2/post-name'>not internal link</a>">
					<InternalLink
						test={(node, site) => {
							return isAnchorTag(node, { isInternalLink: true }, site);
						}}
					/>
				</BlocksRenderer>
			</SettingsProvider>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <p>
          INTERNAL LINK
        </p>
        <a
          href="https://sourceurl.com/site2/post-name"
        >
          not internal link
        </a>
      </div>
    `);
	});

	it('passes the inline styles as an object to the component', () => {
		const FlexDiv: React.FC<BlockProps> = ({ domNode, style, children }) => {
			if (style && style.display !== 'flex') {
				style.display = 'flex';

				return <div style={style}>{children}</div>;
			}

			return domToReact([domNode as DOMNode]) as ReactElement;
		};

		const { container } = render(
			<BlocksRenderer html="<div style='display:flex;'>first content</div><div style='display:block;'>second content</div>">
				<FlexDiv
					test={(node) => {
						return node.name === 'div';
					}}
				/>
			</BlocksRenderer>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          style="display: flex;"
        >
          first content
        </div>
        <div
          style="display: flex;"
        >
          second content
        </div>
      </div>
	`);
	});
});
