import Head from 'next/head';

const ServerErrorPage = () => {
	return (
		<>
			<Head>
				<title>Error</title>
			</Head>
			<h1>500 - Internal Server Error</h1>
		</>
	);
};

export default ServerErrorPage;
