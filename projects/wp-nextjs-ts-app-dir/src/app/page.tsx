import Link from 'next/link';

export default function Home() {
	return (
		<main>
			<Link className="text-blue-500 hover:text-blue-800" href="/blog">
				Blog
			</Link>
		</main>
	);
}
