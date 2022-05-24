import {
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	useAuthorArchive,
} from '@10up/headless-next';
import { Link } from '../../components/Link';
import { resolveBatch } from '../../utils/promises';

const AuthorPage = () => {
	const { loading, error, data } = useAuthorArchive();

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

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
		</>
	);
};

export default AuthorPage;

export async function getServerSideProps(context) {
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
}
