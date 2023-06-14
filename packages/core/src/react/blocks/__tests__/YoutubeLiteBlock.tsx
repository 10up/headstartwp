import { render } from '@testing-library/react';
import * as React from 'react';
import { BlocksRenderer } from '../../components';
import { YoutubeLiteBlock } from '../YoutubeLiteBlock';

jest.mock('@justinribeiro/lite-youtube', () => {
	return {};
});

describe('YoutubeLiteBlock', () => {
	it('render youtube embeds', () => {
		const { container } = render(
			<BlocksRenderer
				html={`<figure class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">
                            <div class="wp-block-embed__wrapper">
                                <iframe loading="lazy" 
                                        title="5 H&Aacute;BITOS QUE TE IMPEDEM DE FICAR MILION&Aacute;RIO" 
                                        width="500" height="281" src="https://www.youtube.com/embed/AoYjt0jUARI?feature=oembed" 
                                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowfullscreen>
                                </iframe>
                            </div>
                        </figure>`.replace(/\r?\n|\r/g, '')}
			>
				<YoutubeLiteBlock />
			</BlocksRenderer>,
		);

		expect(container).toMatchInlineSnapshot(`
      <div>
        <figure
          class="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"
        >
                                      
          <div
            class="wp-block-embed__wrapper"
          >
                                            
            <lite-youtube
              videoid="AoYjt0jUARI"
              videotitle="5 HÁBITOS QUE TE IMPEDEM DE FICAR MILIONÁRIO"
            />
                                        
          </div>
                                  
        </figure>
      </div>
    `);
	});
});
