import {
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	useAuthorArchive,
	HeadlessGetServerSideProps,
} from '@headstartwp/next';
import { Link } from '../../components/Link';
import { Pagination } from '../../components/Pagination';
import { resolveBatch } from '../../utils/promises';

const AuthorPage = () => {
	const { data } = useAuthorArchive();

	return (
		<>
			{data.queriedObject.author ? (
				<h1>Author Page: {data.queriedObject.author.name}</h1>
			) : null}

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

export const getServerSideProps = (async (context) => {
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
}) satisfies HeadlessGetServerSideProps;
