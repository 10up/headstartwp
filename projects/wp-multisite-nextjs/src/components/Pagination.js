import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Link } from './Link';

export const Pagination = ({ pageInfo }) => {
	const { asPath } = useRouter();
	const path = !asPath.includes('/page') ? `${asPath}/page/1` : asPath;

	if (pageInfo.totalPages === 1) {
		return null;
	}

	return (
		<ul className="pagination">
			{pageInfo.page > 1 && (
				<li className="pagination__item">
					<Link
						href={path.replace(
							`/page/${pageInfo.page}`,
							pageInfo.page > 2 ? `/page/${pageInfo.page - 1}` : '',
						)}
					>
						Prev
					</Link>
				</li>
			)}
			{Array.from(Array(pageInfo.totalPages).keys()).map((page) => (
				<li className="pagination__item" key={page + 1}>
					{pageInfo.page !== page + 1 ? (
						<Link
							href={path.replace(
								`/page/${pageInfo.page}`,
								page > 0 ? `/page/${page + 1}` : '',
							)}
						>
							{page + 1}
						</Link>
					) : (
						page + 1
					)}
				</li>
			))}
			{pageInfo.page < pageInfo.totalPages && (
				<li className="pagination__item">
					<Link
						href={path.replace(`/page/${pageInfo.page}`, `/page/${pageInfo.page + 1}`)}
					>
						Next
					</Link>
				</li>
			)}
		</ul>
	);
};

Pagination.propTypes = {
	pageInfo: PropTypes.shape({
		page: PropTypes.number,
		totalItems: PropTypes.number,
		totalPages: PropTypes.number,
	}).isRequired,
};
