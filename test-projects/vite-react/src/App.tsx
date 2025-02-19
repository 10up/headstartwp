import { useState } from 'react';
import { BlocksRenderer, useFetchPosts } from '@headstartwp/core/react';

import reactLogo from './assets/react.svg';
import './App.css';

const App = () => {
	const [count, setCount] = useState(0);

	const { data, loading } = useFetchPosts({ per_page: 5 });

	return (
		<>
			<div>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button type="button" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>

			{loading ? 'Loading...' : JSON.stringify(data)}

			<BlocksRenderer
				html='<p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>'
			/>
		</>
	);
};

export default App;
