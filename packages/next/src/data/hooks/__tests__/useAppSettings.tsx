import { setHeadstartWPConfig, type AppEntity, type EndpointParams } from '@headstartwp/core';
import { expectTypeOf } from 'expect-type';
import { renderHook } from '@testing-library/react';
import * as React from 'react';
import { SettingsProvider } from '@headstartwp/core/react';
import { useAppSettings } from '../useAppSettings';

const config = {
	sourceUrl: 'https://js1.10up.com',
	useWordPressPlugin: true,
};

describe('useAppSettings types', () => {
	beforeAll(() => {
		setHeadstartWPConfig(config);
	});
	const wrapper = ({ children }) => {
		return <SettingsProvider settings={config}>{children}</SettingsProvider>;
	};

	it('allows overriding types', () => {
		interface MyAppEntity extends AppEntity {
			myCustomSetting: string;
		}

		interface Params extends EndpointParams {
			includeCustomSettings: boolean;
		}

		const { result } = renderHook(
			() => useAppSettings<MyAppEntity, Params>({ includeCustomSettings: true }),
			{ wrapper },
		);

		expectTypeOf(result.current.data).toMatchTypeOf<
			| {
					myCustomSetting: string;
			  }
			| undefined
		>();
	});
});
