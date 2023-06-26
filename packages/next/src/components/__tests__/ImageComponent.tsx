import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageComponent, VIPImageLoader } from '../ImageComponent';

describe('VIPImageLoader', () => {
	it('only works with WP images', () => {
		expect(
			VIPImageLoader({ src: 'http://wp.com/wp-content/uploads/2022/20/img.jpg', width: 100 }),
		).toBe('http://wp.com/wp-content/uploads/2022/20/img.jpg?w=100&q=75');

		expect(VIPImageLoader({ src: 'http://wp.com/img.jpg', width: 100 })).toBe(
			'http://wp.com/img.jpg',
		);
	});

	it('maintains the aspect ratio', () => {
		expect(
			VIPImageLoader({
				src: 'http://wp.com/wp-content/uploads/2022/20/img.jpg',
				width: 100,
				aspectRatio: '16:9',
			}),
		).toBe('http://wp.com/wp-content/uploads/2022/20/img.jpg?w=100&h=56&crop=1&q=75');
	});
});

describe('ImageComponent', () => {
	it('renders', () => {
		const src = 'http://wp.com/wp-content/uploads/2022/20/img.jpg';
		const alt = 'image';

		render(<ImageComponent name="core/image" src={src} alt={alt} width={100} height={100} />);

		const img = screen.getByAltText(alt);
		expect(img.getAttribute('src')).toBe(
			'/_next/image?url=http%3A%2F%2Fwp.com%2Fwp-content%2Fuploads%2F2022%2F20%2Fimg.jpg&w=256&q=75',
		);
	});

	it('renders with a custom loader', () => {
		const src = 'http://wp.com/wp-content/uploads/2022/20/img.jpg';
		const alt = 'image';

		render(
			<ImageComponent
				name="core/image"
				src={src}
				alt={alt}
				width={100}
				height={100}
				loader={() => 'https://my-custom-image-loader.com'}
			/>,
		);

		const img = screen.getByAltText(alt);

		expect(img.getAttribute('src')).toBe('https://my-custom-image-loader.com');
	});

	it('renders with the vip image loader', () => {
		const src = 'http://wp.com/wp-content/uploads/2022/20/img.jpg';
		const alt = 'image';

		render(
			<ImageComponent
				name="core/image"
				src={src}
				alt={alt}
				width={100}
				height={100}
				loader={VIPImageLoader}
			/>,
		);

		const img = screen.getByAltText(alt);

		expect(img.getAttribute('src')).toBe(
			'http://wp.com/wp-content/uploads/2022/20/img.jpg?w=256&q=75',
		);
	});
});
