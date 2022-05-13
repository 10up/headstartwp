import { Menu } from '@10up/headless-core/react';
import { useMenu } from '@10up/headless-next';
import { css } from '@emotion/react';

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
	const { data } = useMenu('primary', {
		// these settings will re-render menu client side to ensure
		// it always have the latest items
		revalidateOnMount: true,
		revalidateOnFocus: true,
	});

	if (!data) {
		return null;
	}

	return <Menu items={data} css={navStyles} />;
};
