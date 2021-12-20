import { memo } from 'react';
import { useUserSelector, useUser } from '@10up/headless-core';
import { usePosts, fetchHookData, addHookData, handleError } from '@10up/headless-next';

const FakeComponent = () => {
	const id = useUserSelector((user) => user?.id);

	return <span>{id}</span>;
};

const Memoized = memo(FakeComponent);

const Home = () => {
	const { loading, data } = usePosts();
	const { setUser } = useUser();
	const name = useUserSelector((user) => user?.name);

	return loading ? (
		'Loading...'
	) : (
		<>
			<span>{name}</span>
			<button type="button" onClick={() => setUser({ name: 'Luiz' })}>
				Set Name
			</button>
			<button type="button" onClick={() => setUser({ id: 10 })}>
				Set Id
			</button>
			<Memoized />
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>{post.title.rendered}</li>
				))}
			</ul>
		</>
	);
};

export default Home;

export async function getServerSideProps(context) {
	try {
		const hookData = await fetchHookData('usePosts', context);

		return addHookData(hookData, {});
	} catch (e) {
		return handleError(e, context);
	}
}
