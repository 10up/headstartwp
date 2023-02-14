import { css } from '@linaria/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

const buttonStyles = css`
	border: none;
	background: none;
	position: relative;
	top: 5px;
	cursor: pointer;
`;

const searchInputStyles = css`
	border: 1px solid #e0e0e0;
	border-radius: 2px;
	padding: 10px 20px;
`;

export const Search = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	const goToSearch = () => {
		router.push(`/search/${searchTerm}`);
	};

	const onKeyDown = (e) => {
		if (e.code === 'Enter') {
			goToSearch();
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className={searchInputStyles}
				onKeyDown={onKeyDown}
			/>

			<button type="button" className={buttonStyles} onClick={goToSearch}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width={20}
					height={20}
					viewBox="0 0 24 24"
				>
					<path d="M9 2C5.146 2 2 5.146 2 9s3.146 7 7 7a6.959 6.959 0 004.574-1.719l.426.426V16l6 6 2-2-6-6h-1.293l-.426-.426A6.959 6.959 0 0016 9c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5z" />
				</svg>
			</button>
		</div>
	);
};
