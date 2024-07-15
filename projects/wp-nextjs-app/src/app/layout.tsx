import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PreviewIndicator, queryAppSettings } from '@headstartwp/next/app';
import { Menu, SettingsProvider } from '@headstartwp/core/react';
import { getHeadstartWPConfig } from '@headstartwp/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { menu } = await queryAppSettings({ menu: 'primary' });

	return (
		<html lang="en">
			<body className={inter.className}>
				<SettingsProvider settings={getHeadstartWPConfig()}>
					{menu ? <Menu items={menu} /> : null}
					{children}
					<PreviewIndicator className="form-container" />
				</SettingsProvider>
			</body>
		</html>
	);
};

export default RootLayout;
