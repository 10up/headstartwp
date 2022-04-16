import { usePostImpl, useSettings } from '@10up/headless-core/react';

const Homepage = () => {
	const settings = useSettings();
	console.log(settings);
	const { data, loading } = usePostImpl({ postType: 'page', slug: 'front-page' });

	if (loading) {
		return 'Loading...';
	}

	return <h1>{data.post.title.rendered}</h1>;
};

export default Homepage;
