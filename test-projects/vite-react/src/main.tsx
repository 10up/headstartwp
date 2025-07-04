import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SettingsProvider } from '@headstartwp/core/react';
import { HeadlessConfig, setHeadstartWPConfig } from '@headstartwp/core';

import './index.css';
import App from './App';

const config: HeadlessConfig = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

setHeadstartWPConfig(config);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SettingsProvider settings={{}}>
			<App />
		</SettingsProvider>
	</StrictMode>,
);
