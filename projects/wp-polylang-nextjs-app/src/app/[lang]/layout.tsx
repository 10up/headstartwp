import { HeadstartWPLayout, PreviewIndicator, queryAppSettings } from '@headstartwp/next/app';
import { Menu, SettingsProvider, ThemeSettingsProvider } from '@headstartwp/core/react';

export async function generateStaticParams() {
	// pre-render en and es posts
	return [{ lang: 'en' }, { lang: 'es' }];
}

const RootLayout = async ({ children, params }: Readonly<HeadstartWPLayout>) => {
	const { menu, data, config } = await queryAppSettings({ menu: 'primary', routeParams: params });

	return (
		<ThemeSettingsProvider data={data['theme.json']}>
			<SettingsProvider settings={config}>
				{menu ? <Menu items={menu} /> : null}
				{children}
				<PreviewIndicator className="form-container" />
			</SettingsProvider>
		</ThemeSettingsProvider>
	);
};

export default RootLayout;
