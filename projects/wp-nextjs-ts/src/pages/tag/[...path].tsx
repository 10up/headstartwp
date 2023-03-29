import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	HeadlessGetServerSideProps,
} from '@10up/headless-next';
import { FC } from 'react';
import { Link } from '../../components/Link';
import { Pagination } from '../../components/Pagination';
import { resolveBatch } from '../../utils/promises';

const TagPage: FC = () => {
	const { data } = usePosts({ taxonomy: 'post_tag' });

	return (
		<>
			<h1>Tag Page: {data.queriedObject?.term?.name}</h1>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
			<Pagination pageInfo={data.pageInfo} />
		</>
	);
};

export default TagPage;

export const getServerSideProps: HeadlessGetServerSideProps = async (context) => {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePosts.fetcher(), context, {
					params: { taxonomy: 'post_tag' },
				}),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
};
