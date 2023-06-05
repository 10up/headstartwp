import { IWhiteList } from 'xss';

/**
 * A list of safe SVG elements.
 */
const allowedSVGAttributes = [
	'accent-height',
	'accumulate',
	'additive',
	'alignment-baseline',
	'ascent',
	'attributename',
	'attributetype',
	'azimuth',
	'basefrequency',
	'baseline-shift',
	'begin',
	'bias',
	'by',
	'class',
	'clip',
	'clippathunits',
	'clip-path',
	'clip-rule',
	'color',
	'color-interpolation',
	'color-interpolation-filters',
	'color-profile',
	'color-rendering',
	'cx',
	'cy',
	'd',
	'dx',
	'dy',
	'diffuseconstant',
	'direction',
	'display',
	'divisor',
	'dur',
	'edgemode',
	'elevation',
	'end',
	'fill',
	'fill-opacity',
	'fill-rule',
	'filter',
	'filterunits',
	'flood-color',
	'flood-opacity',
	'font-family',
	'font-size',
	'font-size-adjust',
	'font-stretch',
	'font-style',
	'font-variant',
	'font-weight',
	'fx',
	'fy',
	'g1',
	'g2',
	'glyph-name',
	'glyphref',
	'gradientunits',
	'gradienttransform',
	'height',
	'href',
	'id',
	'image-rendering',
	'in',
	'in2',
	'k',
	'k1',
	'k2',
	'k3',
	'k4',
	'kerning',
	'keypoints',
	'keysplines',
	'keytimes',
	'lang',
	'lengthadjust',
	'letter-spacing',
	'kernelmatrix',
	'kernelunitlength',
	'lighting-color',
	'local',
	'marker-end',
	'marker-mid',
	'marker-start',
	'markerheight',
	'markerunits',
	'markerwidth',
	'maskcontentunits',
	'maskunits',
	'max',
	'mask',
	'media',
	'method',
	'mode',
	'min',
	'name',
	'numoctaves',
	'offset',
	'operator',
	'opacity',
	'order',
	'orient',
	'orientation',
	'origin',
	'overflow',
	'paint-order',
	'path',
	'pathlength',
	'patterncontentunits',
	'patterntransform',
	'patternunits',
	'points',
	'preservealpha',
	'preserveaspectratio',
	'primitiveunits',
	'r',
	'rx',
	'ry',
	'radius',
	'refx',
	'refy',
	'repeatcount',
	'repeatdur',
	'restart',
	'result',
	'rotate',
	'scale',
	'seed',
	'shape-rendering',
	'specularconstant',
	'specularexponent',
	'spreadmethod',
	'startoffset',
	'stddeviation',
	'stitchtiles',
	'stop-color',
	'stop-opacity',
	'stroke-dasharray',
	'stroke-dashoffset',
	'stroke-linecap',
	'stroke-linejoin',
	'stroke-miterlimit',
	'stroke-opacity',
	'stroke',
	'stroke-width',
	'style',
	'surfacescale',
	'systemlanguage',
	'tabindex',
	'targetx',
	'targety',
	'transform',
	'transform-origin',
	'text-anchor',
	'text-decoration',
	'text-rendering',
	'textlength',
	'type',
	'u1',
	'u2',
	'unicode',
	'values',
	'viewbox',
	'visibility',
	'version',
	'vert-adv-y',
	'vert-origin-x',
	'vert-origin-y',
	'width',
	'word-spacing',
	'wrap',
	'writing-mode',
	'xchannelselector',
	'ychannelselector',
	'x',
	'x1',
	'x2',
	'y',
	'y1',
	'y2',
	'z',
	'zoomandpan',
];

export const svgHtmlAllowList: IWhiteList = {
	a: allowedSVGAttributes,
	font: allowedSVGAttributes,
	image: allowedSVGAttributes,
	style: allowedSVGAttributes,
};

/**
 * Default Allowed SVG elements and attributes
 *
 * @returns Array of allowed elements and attributes for SVG tags.
 */
export const svgAllowList: IWhiteList = {
	svg: allowedSVGAttributes,
	altglyph: allowedSVGAttributes,
	altglyphdef: allowedSVGAttributes,
	altglyphitem: allowedSVGAttributes,
	animatecolor: allowedSVGAttributes,
	animatemotion: allowedSVGAttributes,
	animatetransform: allowedSVGAttributes,
	circle: allowedSVGAttributes,
	clippath: allowedSVGAttributes,
	defs: allowedSVGAttributes,
	desc: allowedSVGAttributes,
	ellipse: allowedSVGAttributes,
	filter: allowedSVGAttributes,
	g: allowedSVGAttributes,
	glyph: allowedSVGAttributes,
	glyphref: allowedSVGAttributes,
	hkern: allowedSVGAttributes,
	line: allowedSVGAttributes,
	lineargradient: allowedSVGAttributes,
	marker: allowedSVGAttributes,
	mask: allowedSVGAttributes,
	metadata: allowedSVGAttributes,
	mpath: allowedSVGAttributes,
	path: allowedSVGAttributes,
	pattern: allowedSVGAttributes,
	polygon: allowedSVGAttributes,
	polyline: allowedSVGAttributes,
	radialgradient: allowedSVGAttributes,
	rect: allowedSVGAttributes,
	stop: allowedSVGAttributes,
	switch: allowedSVGAttributes,
	symbol: allowedSVGAttributes,
	text: allowedSVGAttributes,
	textpath: allowedSVGAttributes,
	title: allowedSVGAttributes,
	tref: allowedSVGAttributes,
	tspan: allowedSVGAttributes,
	use: allowedSVGAttributes,
	view: allowedSVGAttributes,
	vkern: allowedSVGAttributes,

	// SVG Filters
	feBlend: allowedSVGAttributes,
	feColorMatrix: allowedSVGAttributes,
	feComponentTransfer: allowedSVGAttributes,
	feComposite: allowedSVGAttributes,
	feConvolveMatrix: allowedSVGAttributes,
	feDiffuseLighting: allowedSVGAttributes,
	feDisplacementMap: allowedSVGAttributes,
	feDistantLight: allowedSVGAttributes,
	feFlood: allowedSVGAttributes,
	feFuncA: allowedSVGAttributes,
	feFuncB: allowedSVGAttributes,
	feFuncG: allowedSVGAttributes,
	feFuncR: allowedSVGAttributes,
	feGaussianBlur: allowedSVGAttributes,
	feMerge: allowedSVGAttributes,
	feMergeNode: allowedSVGAttributes,
	feMorphology: allowedSVGAttributes,
	feOffset: allowedSVGAttributes,
	fePointLight: allowedSVGAttributes,
	feSpecularLighting: allowedSVGAttributes,
	feSpotLight: allowedSVGAttributes,
	feTile: allowedSVGAttributes,
	feTurbulence: allowedSVGAttributes,
};

/**
 * These SVG attributes can be abused.
 *
 * They can reference external resources, which can be used to introduce vulnerabilities.
 * To prevent this, we have stricter rules around what's allowed in them.
 * Specifically, we only allow URLs that we deem to be clean.
 *
 * @see isHrefValueClean
 */
export const linkingSVGElements = ['href', 'xlink:href'];

/**
 * Check if a URL is safe to use in a href attribute.
 *
 * @param {string} url The URL to check.
 * @param {boolean} checkingUse Whether we are checking a <use> tag.
 *
 * @returns {boolean} Whether the URL is safe to use.
 */
export const isHrefValueClean = (url: string, checkingUse: boolean = false): boolean => {
	// If the URL is empty, it's not a problem.
	if (!url) {
		return true;
	}

	// Allow Fragment Identifiers
	if (url.startsWith('#')) {
		return true;
	}

	// Allow relative URLs
	if (url.startsWith('/')) {
		return true;
	}

	// Allow HTTP and HTTPS URLs if not in a <use> tag
	if (!checkingUse && (url.startsWith('http://') || url.startsWith('https://'))) {
		return true;
	}

	// Default to false
	let clean = false;

	// A list of safe mime types to be used in data URLs
	const allowedImageMimeType = [
		'png',
		'gif',
		'jpg',
		'jpeg',
		'pjp',
		'avif',
		'webp',
		'bmp',
		'vnd.microsoft.icon',
		'tiff',
	];

	// Check if the image begins with data:image/ and one of the allowed mime types
	allowedImageMimeType.forEach((mimeType) => {
		if (url.startsWith(`data:image/${mimeType}`) || url.startsWith(`data:img/${mimeType}`)) {
			clean = true;
		}
	});

	return clean;
};
