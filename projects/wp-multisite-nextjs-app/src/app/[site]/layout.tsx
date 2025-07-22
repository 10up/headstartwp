import {
	BlockLibraryStyles,
	HeadstartWPApp,
	HeadstartWPLayout,
	PreviewIndicator,
	queryAppSettings,
} from '@headstartwp/next/app';
import { Menu } from '@headstartwp/core/react';

const RootLayout = async ({ children, params }: Readonly<HeadstartWPLayout>) => {
	const { menu, data, config } = await queryAppSettings({
		menu: 'primary',
		routeParams: await params,
	});

	return (
		<>
			<BlockLibraryStyles params={await params} />
			<HeadstartWPApp settings={config} themeJSON={data['theme.json']}>
				{menu ? <Menu items={menu} /> : null}
				{children}
				<PreviewIndicator className="form-container" />
			</HeadstartWPApp>
		</>
	);
};

export default RootLayout;
