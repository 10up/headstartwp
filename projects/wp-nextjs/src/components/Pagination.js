import { styled } from '@linaria/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Link } from './Link';

const PaginationContainer = styled.ul`
	list-style-type: none;
`;

const PaginationItem = styled.li`
	display: inline;
	margin-right: 5px;
`;

export const Pagination = ({ pageInfo }) => {
	const { asPath } = useRouter();
	const path = !asPath.includes('/page') ? `${asPath}/page/1` : asPath;

	return (
		<PaginationContainer>
			{pageInfo.page > 1 && (
				<PaginationItem>
					<Link href={path.replace(`page/${pageInfo.page}`, `page/${pageInfo.page - 1}`)}>
						Prev
					</Link>
				</PaginationItem>
			)}
			{Array.from(Array(pageInfo.totalPages).keys()).map((page) => (
				<PaginationItem>
					{pageInfo.page !== page + 1 ? (
						<Link href={path.replace(`page/${pageInfo.page}`, `page/${page + 1}`)}>
							{page + 1}
						</Link>
					) : (
						page + 1
					)}
				</PaginationItem>
			))}
			{pageInfo.page < pageInfo.totalPages && (
				<PaginationItem>
					<Link href={path.replace(`page/${pageInfo.page}`, `page/${pageInfo.page + 1}`)}>
						Next
					</Link>
				</PaginationItem>
			)}
		</PaginationContainer>
	);
};

Pagination.propTypes = {
	pageInfo: {
		page: PropTypes.number,
		totalItems: PropTypes.number,
		totalPages: PropTypes.number,
	}.isRequired,
};
