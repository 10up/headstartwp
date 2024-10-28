import { Inter } from 'next/font/google';
import './globals.css';
import { Link, PreviewIndicator, queryAppSettings, HeadstartWPApp } from '@headstartwp/next/app';
import type { SettingsContextProps } from '@headstartwp/core/react';
import { Menu } from '@headstartwp/core/react';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { menu, data, config } = await queryAppSettings({ menu: 'primary' });

	const settings: SettingsContextProps = {
		...config,
		linkComponent: Link,
	};

	return (
		<html lang="en">
			<body className={inter.className}>
				<HeadstartWPApp settings={settings} themeJSON={data['theme.json']}>
					{menu ? <Menu items={menu} /> : null}
					{children}
					<PreviewIndicator className="form-container" />
				</HeadstartWPApp>
			</body>
		</html>
	);
};

export default RootLayout;
