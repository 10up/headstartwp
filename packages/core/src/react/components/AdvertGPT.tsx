import React, { useEffect } from 'react';
import { useScript } from '@10up/react-hooks/src/useScript/useScript';

type GPTProps = {
	adUnitPath: string;
	sizes: Array<Array<number>>;
	divId: string;
	targeting?: Record<string, string>;
	enableSra?: boolean;
	minWidth?: number;
	minHeight?: number;
};

declare global {
	interface Window {
		googletag: any;
		enableSra?: boolean;
	}
}

const AdvertGPT: React.FC<GPTProps> = ({
	adUnitPath,
	sizes,
	divId,
	targeting = {},
	enableSra = false,
	minWidth = 0,
	minHeight = 0,
}): JSX.Element => {
	const [scriptLoaded] = useScript(
		'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
		0,
		'head',
	);

	useEffect(() => {
		if (typeof window !== 'undefined' && scriptLoaded) {
			const { googletag } = window;
			googletag.cmd.push(() => {
				const slot = googletag.defineSlot(adUnitPath, sizes, divId);
				for (const [key, value] of Object.entries(targeting)) {
					slot.setTargeting(key, value);
				}
				slot.addService(googletag.pubads());
				if (enableSra) {
					googletag.pubads().enableSingleRequest();
					window.enableSra = true;
				}
				googletag.enableServices();
				googletag.display(divId);
			});
		}
	}, [adUnitPath, sizes, targeting, enableSra, divId, scriptLoaded]);

	const style: React.CSSProperties = {
		minWidth: minWidth ? `${minWidth}px` : 'auto',
		minHeight: minHeight ? `${minHeight}px` : 'auto',
	};

	return <div id={divId} style={style} />;
};

export default AdvertGPT;
