import { usePost, fetchHookData, addHookData, handleError } from '@10up/headless-next';
import { Blocks } from '../components/Blocks';

const params = {
	postType: ['post', 'page'],
};

const Template = () => {
	const { data } = usePost(params);

	return (
		<div>
			{data ? (
				<>
					<h1>{data.post.title.rendered}</h1>
					<Blocks html={data.post.content.rendered} />
				</>
			) : (
				'loading...'
			)}
		</div>
	);
};

export default Template;

export function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}

export async function getStaticProps(context) {
	try {
		const hookData = await fetchHookData(usePost.fetcher(), context, { params });

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
