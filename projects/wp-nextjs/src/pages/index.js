import { usePost, fetchHookData, addHookData } from '@10up/headless-next/data';
import { handleError } from '@10up/headless-next';
import { Blocks } from '../components/Blocks';

const params = {
	slug: 'front-page',
	postType: 'page',
};

const Homepage = () => {
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

export default Homepage;

export async function getStaticProps(context) {
	try {
		const hookData = await fetchHookData('usePost', context, { params });

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
