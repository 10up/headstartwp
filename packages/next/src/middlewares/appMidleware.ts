import { NextResponse } from 'next/server';

export function AppMiddleware() {
	const res = NextResponse.next();

	return res;
}
