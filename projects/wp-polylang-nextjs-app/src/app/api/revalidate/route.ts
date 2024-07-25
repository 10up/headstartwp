import { revalidateRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	// @ts-expect-error
	return revalidateRouteHandler(request);
}
