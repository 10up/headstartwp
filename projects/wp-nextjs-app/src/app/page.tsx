import { BlocksRenderer } from '@headstartwp/core/react';
import { fetchPost } from '@headstartwp/core';
import styles from './page.module.css';

const Home = async () => {
	const { data } = await fetchPost(
		{
			matchCurrentPath: false,
		},
		{},
		'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
	);

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>
		</main>
	);
};

export default Home;
