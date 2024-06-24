import { BlocksRenderer } from '@headstartwp/core/react';
import { fetchPost } from '@headstartwp/core';
import styles from './page.module.css';

const Home = async () => {
	const { data } = await fetchPost({
		path: '/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
		params: {
			matchCurrentPath: false,
		},
	});

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>
		</main>
	);
};

export default Home;
