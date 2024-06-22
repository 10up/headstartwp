import { fetchPostByPath, HeadstartWPRoute } from '@headstartwp/next';

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data } = await fetchPostByPath(
		params.path,
		{
			params: {},
		},
		{
			headers: {
				cache: 'no-store',
			},
		},
	);

	return (
		<article>
			<h1>{data.post.title.rendered}</h1>
		</article>
	);
};

export default Single;
