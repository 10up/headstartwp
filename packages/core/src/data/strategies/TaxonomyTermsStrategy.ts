import { ConfigError, getCustomTaxonomy } from '../../utils';
import { endpoints } from '../utils';

import { TermEntity } from '../types';

import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export interface TaxonomyArchiveParams extends EndpointParams {
	taxonomy: string;
	page?: string;
}

export class TaxonomyTermsStrategy extends AbstractFetchStrategy<
	TermEntity,
	TaxonomyArchiveParams
> {
	defaultTaxonmy = 'category';

	getDefaultEndpoint(): string {
		return endpoints.category;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string): Partial<TaxonomyArchiveParams> {
		return { _embed: true };
	}

	buildEndpointURL(params: Partial<TaxonomyArchiveParams>) {
		const { taxonomy = this.defaultTaxonmy, ...endpointParams } = params;

		const taxonomyObj = getCustomTaxonomy(taxonomy);

		if (!taxonomyObj) {
			throw new ConfigError(
				'Unkown taxonomy, did you forget to add it to headless.config.js?',
			);
		}

		this.setEndpoint(taxonomyObj.endpoint);

		return super.buildEndpointURL(endpointParams);
	}
}
