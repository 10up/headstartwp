import { loadHeadlessConfig } from '@10up/headless-next/config';
import { Html, Head, Main, NextScript } from 'next/document';

loadHeadlessConfig();

const Document = () => {
	return (
		<Html>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
