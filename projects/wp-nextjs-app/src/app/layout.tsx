import { Inter } from 'next/font/google';
import './globals.css';
import { PreviewIndicator, queryAppSettings } from '@headstartwp/next/app';
import { Menu, SettingsProvider, ThemeSettingsProvider } from '@headstartwp/core/react';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { menu, data, config } = await queryAppSettings({ menu: 'primary' });

	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeSettingsProvider data={data['theme.json']}>
					<SettingsProvider settings={config}>
						{menu ? <Menu items={menu} /> : null}
						{children}
						<PreviewIndicator className="form-container" />
					</SettingsProvider>
				</ThemeSettingsProvider>
			</body>
		</html>
	);
};

export default RootLayout;
