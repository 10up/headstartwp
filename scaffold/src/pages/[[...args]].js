import { usePost } from '@10up/headless-core';

const Home = () => {
	const { data } = usePost();
	console.log(data);
	return <div>test</div>;
};

export default Home;
