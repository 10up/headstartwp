import PropTypes from 'prop-types';
import { usePost } from '@10up/headless-next';
import { Blocks } from './Blocks';

export const PageContent = ({ params }) => {
	const { data } = usePost(params);
	return (
		<>
			<h1>{data.post.title.rendered}</h1>
			<Blocks html={data.post.content.rendered} />
		</>
	);
};

PageContent.propTypes = {
	params: PropTypes.shape({}).isRequired,
};
