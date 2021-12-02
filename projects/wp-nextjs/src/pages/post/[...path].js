// eslint-disable-next-line
import { usePost, fetchHookData, addHookData } from '@10up/headless-next/data';

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
	const hookData = await fetchHookData('usePost', context);

	return addHookData(hookData, {});
}
