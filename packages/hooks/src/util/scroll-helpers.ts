import { isBrowser } from './isBrowser';

export const isElementInView = (
	el: HTMLElement,
	updateOnce: boolean = true,
	offset: number = 0.5,
) => {
	if (!el || !('classList' in el)) {
		return false;
	}

	if (updateOnce && el.classList.contains('-viewed')) {
		return false;
	}

	const elTop = el.getBoundingClientRect().top;
	const windowHeight = window.innerHeight || document.documentElement.clientHeight;
	const newWindowHeight = windowHeight * offset;
	const isInView = elTop < newWindowHeight;

	if (updateOnce && isInView) {
		el.classList.add('-viewed');
	}

	return isInView;
};

export function getScrollPosition() {
	const doc = isBrowser ? (document as unknown as HTMLElement) : null;

	return isBrowser && doc ? (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) || 0 : 0;
}

export function getElementCoordinates(el: HTMLElement, position = getScrollPosition()) {
	if (!isBrowser || !el) {
		return {
			top: 0,
			height: 0,
			middle: 0,
			bottom: 0,
		};
	}

	const rect = el.getBoundingClientRect
		? el.getBoundingClientRect()
		: {
				top: el.offsetTop,
				height: 0,
		  };

	const top = rect.top + position;

	return {
		top,
		height: rect.height,
		middle: top + rect.height / 2,
		bottom: top + rect.height,
	};
}
