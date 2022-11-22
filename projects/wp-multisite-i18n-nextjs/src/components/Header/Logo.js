import { css } from '@linaria/core';

const logoStyles = css`
	text-align: center;

	> span {
		display: inline-block;
		color: #000;
		font-weight: 500;
		background: #f2f2f2;
		padding: 10px 20px;
		margin: 0 20px;
		font-size: 26px;
		line-height: 30px;
	}
`;

export const Logo = () => {
	return (
		<div className={logoStyles}>
			<span>Brand Logo</span>
		</div>
	);
};
