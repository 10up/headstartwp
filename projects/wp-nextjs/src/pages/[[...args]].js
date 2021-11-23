import { usePost, fetchSinglePostSSR } from '@10up/headless-core';

const Home = () => {
	const { data } = usePost();

	return <div>{data.post.title}</div>;
};

export default Home;

export async function getServerSideProps(context) {
	const { key, data } = fetchSinglePostSSR(context);
	console.log(key, data);
	return {
		props: {
			fallback: {},
		},
	};
}
