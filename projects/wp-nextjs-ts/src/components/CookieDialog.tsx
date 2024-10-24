import React, { FC, useState, useEffect, useCallback, ReactElement } from 'react';
import { css } from '@linaria/core';
import { Link } from './Link';

const cookieDialogStyles = css`
	bottom: 1rem;
	box-sizing: border-box;
	display: block;
	inset-inline-start: unset;
	margin: unset;
	max-width: 500px;
	position: fixed;
	right: 1rem;
	width: calc(100dvw - 2rem);
	z-index: 1;

	> form {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	> form label {
		align-items: center;
		display: flex;
		font-weight: 700;
		gap: 0.25em;
	}

	> form p {
		margin-block: 0;
	}
`;

// The main cookie checked when determining if the dialog should be displayed
const REVIEWED_DIALOG_COOKIE = 'cookie-dialog-reviewed';

// Helper functions
const getCookie = async (name: string): Promise<{ value: string } | null> => {
	try {
		const value = document.cookie
			.split('; ')
			.find((row) => row.startsWith(name))
			?.split('=')[1];
		return value ? { value } : null;
	} catch (error) {
		return null;
	}
};

const setCookie = async (name: string, value: string): Promise<void> => {
	try {
		const expiration = new Date();
		expiration.setMonth(expiration.getMonth() + 6);
		document.cookie = `${name}=${value}; expires=${expiration.toUTCString()}; samesite=strict; secure`;
		return null;
	} catch (error) {
		return null;
	}
};

type CookieElementProps = {
	cookie: CookieProps;
	handleCheckboxChange: (cookieName: string) => void;
	acceptedCookies: { [key: string]: boolean };
};

const CookieElement = React.memo<CookieElementProps>(
	({ cookie, handleCheckboxChange, acceptedCookies }) => (
		<div key={cookie.name}>
			<label htmlFor={cookie.name}>
				<input
					type="checkbox"
					name={cookie.name}
					id={cookie.name}
					value={cookie.name}
					aria-describedby={`${cookie.name}-description`}
					onChange={() => handleCheckboxChange(cookie.name)}
					defaultChecked={acceptedCookies[cookie.name] || cookie.isChecked}
					disabled={cookie?.isDisabled}
				/>{' '}
				{cookie.label}
			</label>
			<p id={`${cookie.name}-description`}>{cookie.description}</p>
		</div>
	),
);

export interface CookieProps {
	name: string;
	label: string;
	description: string | ReactElement;
	isChecked: boolean;
	isDisabled?: boolean;
}

// Ignore the error as it's a false positive since the defaults are actually
// being set.
/* eslint-disable-next-line react/require-default-props */
export const CookieDialog: FC<{
	// Ignore the error since it's a false positive, the default is set.
	/* eslint-disable-next-line react/require-default-props */
	label?: string;
	// Ignore the error since it's a false positive, the default is set.
	/* eslint-disable-next-line react/require-default-props */
	cookies?: [CookieProps, ...CookieProps[]];
	// Ignore the error since it's a false positive, the default is set.
	/* eslint-disable-next-line react/require-default-props */
	onAccept?: (acceptedCookies: { [key: string]: boolean }) => void;
	// Ignore the error since it's a false positive, the default is set.
	/* eslint-disable-next-line react/require-default-props */
	onReject?: () => void;
}> = ({
	label = 'Cookie settings',
	children = (
		<p>
			We use cookies on our website to give you the most relevant experience by remembering
			your preferences and repeat visits. By clicking &apos;Accept&apos;, you consent to the
			use of cookies. For more information, you can check our{' '}
			<Link href="/">Privacy Policy</Link> <Link href="/">Cookie Policy</Link>.
		</p>
	),
	cookies = [
		{
			name: 'essential',
			label: 'Essential cookies',
			description: (
				<>
					By continuing to use our site, you accept our use of cookies as described in our{' '}
					<Link href="/">Privacy Policy</Link>.
				</>
			),
			isChecked: false,
		},
	],
	onAccept = () => {},
	onReject = () => {},
}) => {
	const [isDialogVisible, setDialogVisible] = useState(false);
	const [acceptedCookies, setAcceptedCookies] = useState<{ [key: string]: boolean }>(
		cookies.reduce((acc: { [key: string]: boolean }, cookie: CookieProps) => {
			acc[cookie.name] = cookie.isChecked;
			return acc;
		}, {}),
	);

	useEffect(() => {
		const checkCookie = async () => {
			const cookie = await getCookie(REVIEWED_DIALOG_COOKIE);
			if (!cookie) {
				setDialogVisible(true);
			}
		};
		checkCookie();
	}, [cookies]);

	const handleDialogClose = useCallback(
		async (value: string) => {
			setCookie(REVIEWED_DIALOG_COOKIE, 'reviewed');

			const setCookiesPromises = Object.keys(acceptedCookies).map((cookieName) => {
				if (acceptedCookies[cookieName]) {
					return setCookie(cookieName, value);
				}
				return Promise.resolve();
			});

			try {
				await Promise.all(setCookiesPromises);
				setDialogVisible(false);
				if (value === 'accept' && onAccept) {
					onAccept(acceptedCookies);
				} else if (value === 'reject' && onReject) {
					onReject();
				}

				return null;
			} catch (error) {
				return null;
			}
		},
		[acceptedCookies, onAccept, onReject],
	);

	const handleCheckboxChange = useCallback((cookieName: string) => {
		setAcceptedCookies((prev) => ({
			...prev,
			[cookieName]: !prev[cookieName],
		}));
	}, []);

	if (!isDialogVisible) return null;

	return (
		<dialog
			className={cookieDialogStyles}
			aria-labelledby="label"
			aria-describedby="description"
		>
			{label && <h2 id="label">{label}</h2>}
			<div id="description">{children}</div>
			<form method="dialog">
				{cookies.length > 1 &&
					cookies.map((cookie) => {
						return (
							<CookieElement
								key={cookie.name}
								cookie={cookie}
								handleCheckboxChange={handleCheckboxChange}
								acceptedCookies={acceptedCookies}
							/>
						);
					})}
				<button type="button" onClick={() => handleDialogClose('accept')} value="accept">
					Accept
				</button>
				<button type="button" onClick={() => handleDialogClose('reject')} value="reject">
					Reject
				</button>
			</form>
		</dialog>
	);
};
