import { removeSourceUrl } from '@headstartwp/core';

export function convertUrl(url: string, hostUrl: string, sourceUrl: string) {
	if (!url.startsWith(sourceUrl)) {
		return url;
	}

	return `${hostUrl}${removeSourceUrl({
		link: url,
		publicUrl: hostUrl,
		backendUrl: sourceUrl,
		nonEmptyLink: false,
	})}`;
}
