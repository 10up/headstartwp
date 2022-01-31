import { usePost, fetchHookData, addHookData } from '@10up/headless-next/data';
import { handleError } from '@10up/headless-next';

const Template = () => {
	const { data } = usePost({ postType: 'book' });

	return (
		<div>
			{data ? (
				<>
					<h1>{data.post.title.rendered}</h1>
					{data.post.content.rendered}
					<p>Author: {data.post.author[0].name}</p>
				</>
			) : (
				'loading...'
			)}
		</div>
	);
};

export default Template;

export async function getServerSideProps(context) {
	try {
		const hookData = await fetchHookData('usePost', context, { postType: 'book' });

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
