import { BlocksRenderer } from '@headstartwp/core/react';
import { useFetchPost } from '@headstartwp/core/rsc';
import { setHeadstartWPConfig } from '@headstartwp/core';
import styles from './page.module.css';
import config from '../../headstartwp.config';

setHeadstartWPConfig(config);

const Home = async () => {
	const { data } = await useFetchPost({
		slug: '/distinctio-rerum-ratione-maxime-repudiandae-laboriosam-quam',
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
