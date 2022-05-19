/* eslint-disable */

// #region post-by-slug
import { usePost } from '@10up/headless-next';

const PostPage = () => {
	const { loading, error, data } = usePost({ slug: 'my-post' });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title}</h2>
            <p>{data?.post.content}</p>
		</div>
	);
};
// #endregion post-by-slug

// #region page-by-slug
import { usePost } from '@10up/headless-next';

const Page = () => {
	const { loading, error, data } = usePost({ slug: 'front-page', postType: 'page' });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title}</h2>
            <p>{data?.post.content}</p>
		</div>
	);
};
// #endregion page-by-slug

// #region post-page-by-slug
import { usePost } from '@10up/headless-next';

const PostOrPage = () => {
	const { loading, error, data } = usePost({ slug: 'front-page', postType: ['page', 'post'] });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title}</h2>
            <p>{data?.post.content}</p>
		</div>
	);
};
// #endregion post-page-by-slug

// #region cpt
// headless.config.js
module.exports = {
    // ...
    customPostTypes: [
		// this is just an example
		{
			slug: 'book',
			endpoint: '/wp-json/wp/v2/book',
		},
	],
    // ...
};

import { usePost } from '@10up/headless-next';

const Cpt = () => {
    // book needs to be defined in headless.config.js
	const { loading, error, data } = usePost({ slug: 'book-name', postType: ['book'] });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title}</h2>
            <p>{data?.post.content}</p>
		</div>
	);
};
// #endregion cpt

// #region url-params
// pages/[...path].js
// This route will match /post-name, /2021/post-name, /2021/12/post-name, etc.
import { usePost } from '@10up/headless-next';

const SinglePost = () => {
    // slug is automatically injected from the next.js router
    // if you pass a slug it will override what's coming from the URL
	const { loading, error, data } = usePost();

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title}</h2>
            <p>{data?.post.content}</p>
		</div>
	);
};
// #endregion url-params

// #region ssr-ssg
// pages/[...path].js
import {
	usePost,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';

const params = { postType: ['post', 'page'] };

const SinglePostsPage = () => {
	const { loading, error, data } = usePost(params);

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title}</h2>
            <p>{data?.post.content}</p>
		</div>
	);
};

export default SinglePostsPage;

// or export async function getServerSideProps(contenxt)
export async function getStaticProps(context) {
	try {
        const usePostHook = await fetchHookData(usePost.fetcher(),context, { params });

		return addHookData([usePostHook], {});
	} catch (e) {
		return handleError(e, context);
	}
}

// #endregion ssr-ssg
