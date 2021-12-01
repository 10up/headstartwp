// eslint-disable-next-line
import { usePost, fetchSinglePostServerSide } from '@10up/headless-next/data';

const Template = () => {
	const { data } = usePost();

	return (
		<div>
			{data ? (
				<>
					<h1>{data.post.title.rendered}</h1>
					{data.post.content.rendered}
				</>
			) : (
				'loading...'
			)}
		</div>
	);
};

export default Template;

export async function getServerSideProps(context) {
	const { key, data } = await fetchSinglePostServerSide(context);

	return {
		props: {
			fallback: {
				[key]: data,
			},
		},
	};
}
