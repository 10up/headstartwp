import {
	fetchPost,
	getCustomPostType,
	getHeadstartWPConfig,
	getSiteByHost,
	removeSourceUrl,
} from '@headstartwp/core';
import type { NextRequest } from 'next/server';
import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { PreviewData } from '../../handlers';

export const COOKIE_NAME = 'headstartwp_preview';

export async function previewRouteHandler(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const post_id = Number(searchParams.get('post_id') ?? 0);
	const post_type = searchParams.get('post_type');
	const is_revision = searchParams.get('is_revision');
	const token = searchParams.get('token');
	const locale = searchParams.get('locale');

	// check if post_id, post_type and token is set
	if (!post_id || !token || !post_type) {
		return new Response('Missing required params', { status: 401 });
	}

	// get the host header
	const host = request.headers.get('host') ?? '';
	const site = getSiteByHost(host, typeof locale === 'string' ? locale : undefined);
	const isMultisiteRequest = site !== null && typeof site.sourceUrl === 'string';

	const config = isMultisiteRequest ? site : getHeadstartWPConfig();
	const { sourceUrl, preview } = config;

	const revision = is_revision === '1';

	const postTypeDef = getCustomPostType(post_type as string, sourceUrl);

	if (!postTypeDef) {
		return new Response(
			'Cannot preview an unknown post type, did you forget to add it to headstarwp.config.js?',
			{ status: 401 },
		);
	}

	const { data } = await fetchPost(
		{
			params: {
				id: Number(post_id),
				postType: post_type,
				revision,
				authToken: token as string,
				lang: typeof locale === 'string' ? locale : undefined,
			},
			options: {
				alternativePreviewAuthorizationHeader:
					preview?.alternativeAuthorizationHeader ?? false,
			},
		},
		config,
	);

	const id = Number(post_id);

	const result = data.post;

	if (result?.id === id || result?.parent === id) {
		const { slug } = result;

		const previewData: PreviewData = {
			id,
			postType: post_type as string,
			revision,
			authToken: token as string,
		};

		/**
		 * Builds the default redirect path
		 *
		 * @returns the default redirec tpath
		 */
		const getDefaultRedirectPath = () => {
			if (preview?.usePostLinkForRedirect) {
				if (
					result.status === 'draft' &&
					typeof result._headless_wp_preview_link === 'undefined'
				) {
					throw new Error(
						'You are using usePostLinkForRedirect setting but your rest response does not have _headless_wp_preview_link, ensure you are running the latest version of the plugin',
					);
				}
				const link = result._headless_wp_preview_link ?? result.link;
				return removeSourceUrl({ link: link as string, backendUrl: sourceUrl ?? '' });
			}

			const singleRoute = postTypeDef.single || '/';
			// remove leading slashes
			const prefixRoute = singleRoute.replace(/^\/+/, '');
			const slugOrId = revision ? post_id : slug || post_id;
			const path = [locale, prefixRoute, slugOrId].filter((n) => n).join('/');
			return `/${path}`;
		};

		const redirectPath = getDefaultRedirectPath();

		console.log('Setting preview cookie', previewData, redirectPath);
		cookies().set(COOKIE_NAME, JSON.stringify(previewData), {
			maxAge: 5 * 60,
			// path: redirectPath,
		});

		draftMode().enable();

		redirect(redirectPath);
	}

	return new Response('There was an error setting up preview', { status: 500 });
}
