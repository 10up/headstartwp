import {
	SettingsContextProps,
	SettingsProvider,
	ThemeSettingsProvider,
} from '@headstartwp/core/react';
import React, { FC, ReactNode } from 'react';
import { AppEntity } from '@headstartwp/core';

type HeadstartWPAppProps = {
	/**
	 * Supported settings by the framework. Such as custom image component, custom link component etc.
	 *
	 * @see {@link SettingsContextProps}
	 */
	settings: SettingsContextProps;

	/**
	 * Theme settings from the `theme.json`.
	 *
	 * Passing this will expose theme json through `useThemeSettings` hook.
	 */
	themeJSON?: AppEntity['theme.json'];

	children?: ReactNode;
};

export const HeadstartWPApp: FC<HeadstartWPAppProps> = ({ settings, children, themeJSON = {} }) => {
	return (
		<SettingsProvider settings={settings}>
			<ThemeSettingsProvider data={themeJSON}>{children}</ThemeSettingsProvider>
		</SettingsProvider>
	);
};
