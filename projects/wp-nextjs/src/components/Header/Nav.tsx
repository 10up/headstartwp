import { Menu } from '@headstartwp/core/react';
import { useMenu } from '@headstartwp/next';
import { css } from '@linaria/core';

const navStyles = css`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0;
	padding: 0;

	li,
	a {
		color: #333;
		text-transform: uppercase;
		letter-spacing: 1px;
		text-decoration: none;
		cursor: pointer;
	}

	a:hover {
		text-decoration: underline;
	}

	> li {
		list-style-type: none;
	}

	> li > ul {
		display: none;
	}
`;

export const Nav = () => {
	const { data, loading, error } = useMenu('primary');

	if (loading || error) {
		return null;
	}

	return <Menu items={data} className={navStyles} />;
};
