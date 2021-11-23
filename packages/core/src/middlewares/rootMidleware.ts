import { NextResponse } from 'next/server';

export default function () {
	const res = NextResponse.next();

	res.headers.set('X-WP-Url', 'https://js1.10up.com');
}
