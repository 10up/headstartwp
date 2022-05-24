/* eslint-disable */

// #region list-of-post
import { usePosts } from '@10up/headless-next';

const PostsList = () => {
	const { loading, error, data } = usePosts();

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
import { usePosts } from '@10up/headless-next';

const PagesList = () => {
	const { loading, error, data } = usePosts( {postType: 'page' });

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

import { usePosts } from '@10up/headless-next';

const BookList = () => {
	const { loading, error, data } = usePosts({ postType: 'book' });

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
				{data.posts.map((book) => (
					<li key={book.id}>
						{book.title.rendered}
					</li>
				))}
			</ul>
		</>
	);
};
// #endregion cpt

// #region url-params
// pages/blog/[[...path]].js

import { usePosts } from '@10up/headless-next';

const BlogRoute = () => {
    // url params are automatically injected from the URL
	const { loading, error, data } = usePosts();

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

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
// #endregion url-params

// #region taxonomy-page
// pages/category/[...path].js
import {
	usePosts,
} from '@10up/headless-next';

const CategoryPage = () => {
	const { loading, error, data } = usePosts({ taxonomy: 'category' });

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<>
			<h1>Category Page</h1>
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

// #endregion taxonomy-page

// #region multiple-wordpress-routes

// pages/[[...path]].js
import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';

const params = { postType: 'post' };

const Posts = () => {
	const { data, pageType } = usePosts(params);

    // when doing ssr/ssg data will always be avaliable so handling loading/error state is optional

    if (pageType.isAuthorArchive) {
        return <AuthorArchive data={data} />
    }

    if (pageType.isCategoryArchive) {
        return <CategoryArchive data={data} />
    }

    if (pageType.isTaxonomyArchive && pageType.taxonomy === 'my-custom-taxonomy' ) {
        return <TaxonomyArchive data={data} />
    }

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
        const usePostsHook = await fetchHookData(usePosts.fetcher(),context, { params });

		return addHookData([usePostsHook], {});
	} catch (e) {
		return handleError(e, context);
	}
}

// #endregion multiple-wordpress-routes

// #region ssr-ssg
// pages/[...path].js
import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';

const params = { postType: 'post' };

const Posts = () => {
	const { data } = usePosts(params);

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
        const usePostsHook = await fetchHookData(usePosts.fetcher(),context, { params });

		return addHookData([usePostsHook], {});
	} catch (e) {
		return handleError(e, context);
	}
}

// #endregion ssr-ssg