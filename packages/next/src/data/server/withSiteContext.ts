import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { PreviewData } from '../../handlers/types';

export function withSiteContext(
	ctx: GetServerSidePropsContext<any, PreviewData> | GetStaticPropsContext<any, PreviewData>,
	site: string,
) {
	return {
		...ctx,
		params: {
			...(ctx.params ?? {}),
			site,
		},
	};
}
