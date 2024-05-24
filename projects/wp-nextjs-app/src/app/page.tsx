import { BlockProps, BlocksRenderer } from '@headstartwp/core/react';
// eslint-disable-next-line
import { DOMNode, Element } from 'html-react-parser';
import styles from './page.module.css';

async function fetchBlockData() {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ title: 'test' }), 200);
	});
}

const DivToP = async ({ domNode, children }: BlockProps) => {
	const { title } = await fetchBlockData();

	const className = domNode instanceof Element ? domNode?.attribs.class || undefined : undefined;
	return (
		<p className={className}>
			{title}
			{children}
		</p>
	);
};

const Home = () => {
	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<BlocksRenderer html="<div class='my-class'>This Will Become a p tag</div><div>This Will Become a p tag</div>">
					<DivToP
						test={(node: DOMNode) => {
							if (!(node instanceof Element)) {
								return false;
							}
							return node.type === 'tag' && node.name === 'div';
						}}
					/>
				</BlocksRenderer>
			</div>
		</main>
	);
};

export default Home;
