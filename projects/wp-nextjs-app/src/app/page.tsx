import { BlocksRenderer } from '@headstartwp/core/react';
import { fetchPost, fetchPosts, setHeadstartWPConfig } from '@headstartwp/core';
import styles from './page.module.css';
import config from '../../headstartwp.config';

setHeadstartWPConfig(config);

const Home = async () => {
	const {
		data: { posts },
	} = await fetchPosts();

	const { data } = await fetchPost(
		{
			matchCurrentPath: false,
		},
		{},
		'/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
	);

	console.log(posts);

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>
		</main>
	);
};

export default Home;
