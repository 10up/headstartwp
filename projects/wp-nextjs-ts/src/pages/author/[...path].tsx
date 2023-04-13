import {
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	useAuthorArchive,
	HeadlessGetServerSideProps,
} from '@10up/headless-next';
import { FC } from 'react';
import { Link } from '../../components/Link';
import { Pagination } from '../../components/Pagination';
import { resolveBatch } from '../../utils/promises';

const AuthorPage: FC = () => {
	const { data } = useAuthorArchive();

	return (
		<>
			<h1>Author Page: {data.queriedObject.author.name}</h1>
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

export default AuthorPage;

export const getServerSideProps: HeadlessGetServerSideProps = async (context) => {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(useAuthorArchive.fetcher(), context),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
};
