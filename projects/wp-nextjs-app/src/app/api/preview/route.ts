import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';
import { setHeadlessConfig } from '@headstartwp/core';
import config from '../../../../headstartwp.config';

setHeadlessConfig(config);

export async function GET(request: NextRequest) {
	// @ts-expect-error
	return previewRouteHandler(request);
}
