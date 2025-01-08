'use client';

import { useSearch } from '../../hooks/use-search';
import { useElasticPress } from '../provider/ep-provider';
import styles from './styles.module.css';

type PostItemType = {
	post: {
		post_title: string;
		permalink: string;
	};
};
const PostItem = ({ post }: PostItemType) => {
	return (
		<li>
			<a href={post.permalink}>{post.post_title}</a>
		</li>
	);
};

const LoadMore = ({ buttonText = 'Load More' }) => {
	const { loadMore } = useSearch();

	return (
		<button
			className={`${styles.button} ep-load-more`}
			onClick={() => {
				loadMore();
			}}
			type="button"
		>
			{buttonText}
		</button>
	);
};

export default function Posts({
	PostItemComponent = PostItem,
	LoadMoreComponent = LoadMore,
	noPostsFoundMessage = 'No posts found.',
	loadingMessage = 'Loading...',
}) {
	const { loading, results } = useElasticPress();

	const { items, totalResults = 0 } = results;

	if (loading && !items) {
		return (
			<section className="ep-posts loading">
				<p>{loadingMessage}</p>
			</section>
		);
	}

	if (!results || !items?.length) {
		return (
			<section className="ep-posts ">
				<p>{noPostsFoundMessage}</p>
			</section>
		);
	}

	return (
		<section className="ep-posts">
			{items.length > 0 ? (
				<ul>
					{items.map((post) => {
						return <PostItemComponent key={post.ID} post={post} />;
					})}
				</ul>
			) : null}

			{loading ? <p>{loadingMessage}</p> : null}
			{items.length < (totalResults || 0) ? <LoadMoreComponent /> : null}
		</section>
	);
}
