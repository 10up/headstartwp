/* eslint-disable */

// #region list-of-post
// pages/author/[...path].js
import { useAuthorArchive } from '@10up/headless-next';

const AuthorArchive = () => {
	const { loading, error, data } = useAuthorArchive();

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<>
			<h1>Blog Page</h1>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						{post.title.rendered}
					</li>
				))}
			</ul>
		</>
	);
};
// #endregion list-of-post

// #region list-of-pages
// pages/author/pages/[...path].js
import { useAuthorArchive } from '@10up/headless-next';

const AuthorPagesArchive = () => {
	const { loading, error, data } = useAuthorArchive({ postType: 'page' });

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<>
			<h1>Author Pages Archive</h1>
			<ul>
				{data.posts.map((page) => (
					<li key={page.id}>
						{page.title.rendered}
					</li>
				))}
			</ul>
		</>
	);
};
// #endregion list-of-pages

// #region ssr-ssg
// pages/author/[...path].js
import {
	useAuthorArchive,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';


const Posts = () => {
	const { data } = useAuthorArchive();

    // when doing ssr/ssg data will always be avaliable so handling loading/error state is optional

	return (
		<div>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						{post.title.rendered}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;

// or export async function getServerSideProps(context)
export async function getStaticProps(context) {
	try {
        const useAuthorArchiveHookData = await fetchHookData(useAuthorArchive.fetcher(),context);

		return addHookData([useAuthorArchiveHookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}

// #endregion ssr-ssg