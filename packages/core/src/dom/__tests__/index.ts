import { Element } from 'html-react-parser';
import { isAnchorTag, isImageTag, isTwitterEmbed, isYoutubeEmbed } from '..';

jest.mock('../../utils/config', () => {
	return {
		getWPUrl: () => 'https://backendurl.com',
	};
});

describe('isAnchorTag', () => {
	it('properly detects anchor nodes', () => {
		let node = new Element('a', { href: 'https://example.com' });
		expect(isAnchorTag(node)).toBe(true);

		// we only consider anchor tags with an href attribute
		node = new Element('a', {});
		expect(isAnchorTag(node)).toBe(false);

		node = new Element('b', { href: 'https://example.com' });
		expect(isAnchorTag(node)).toBe(false);
	});

	it('properly detects anchor nodes with internal links', () => {
		let node = new Element('a', { href: 'https://backendurl.com/post-name' });
		expect(isAnchorTag(node, { isInternalLink: true })).toBe(true);

		node = new Element('a', { href: 'https://backendurl.com/' });
		expect(isAnchorTag(node, { isInternalLink: true })).toBe(true);

		node = new Element('a', { href: 'https://backendurl.com/', target: '_blank' });
		expect(isAnchorTag(node, { isInternalLink: true })).toBe(false);
	});
});

describe('isImageTag', () => {
	it('properly detects image nodes', () => {
		let node = new Element('img', { src: 'https://example.com' });
		expect(isImageTag(node)).toBe(true);

		// we only consider image tags with an src attribute
		node = new Element('img', {});
		expect(isImageTag(node)).toBe(false);

		node = new Element('img', { href: 'https://example.com', width: '200', height: '200' });
		expect(isImageTag(node, { hasDimensions: true })).toBe(false);

		node = new Element('img', { href: 'https://example.com' });
		expect(isImageTag(node, { hasDimensions: true })).toBe(false);
	});
});

describe('isYoutubeEmbed', () => {
	it('properly detects youtube embeds', () => {
		let node = new Element('iframe', { src: 'https://www.youtube.com/embed/ey06jcq9Op0' });
		expect(isYoutubeEmbed(node)).toBe(true);

		node = new Element('iframe', { src: 'https://www.youtube.com/embed/ey06jcq9Op0' });
		expect(isYoutubeEmbed(node)).toBe(true);

		node = new Element('iframe', { src: 'https://www.vimeo.com/embed/ey06jcq9Op0' });
		expect(isYoutubeEmbed(node)).toBe(false);

		node = new Element('iframe', { src: 'https://ramdon.com' });
		expect(isYoutubeEmbed(node)).toBe(false);
	});
});

describe('isTwitterEmbed', () => {
	it('properly detects twitter embeds', () => {
		let node = new Element('figure', { class: 'wp-block-embed-twitter' });
		expect(isTwitterEmbed(node)).toBe(true);

		node = new Element('figure', { class: 'wp-block-embed-twitter wp-block-bla-bla' });
		expect(isTwitterEmbed(node)).toBe(true);

		node = new Element('div', { class: 'wp-block-embed-twitter' });
		expect(isTwitterEmbed(node)).toBe(false);

		node = new Element('figure', { class: 'wp-block-embed-twitter2' });
		expect(isTwitterEmbed(node)).toBe(false);
	});
});
