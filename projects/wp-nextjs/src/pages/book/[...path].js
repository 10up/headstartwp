/**
 * This is just an example of a single page route for a CPT called 'book'
 */
import { fetchHookData, addHookData, handleError, usePost } from '@10up/headless-next';
import { bookParams } from '../../params';

const BookPage = () => {
	const { data } = usePost(bookParams);

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

export default BookPage;

export async function getServerSideProps(context) {
	try {
		const hookData = await fetchHookData(usePost.fetcher(), context, {
			params: bookParams,
		});

		return addHookData([hookData], {});
	} catch (e) {
		return handleError(e, context);
	}
}
