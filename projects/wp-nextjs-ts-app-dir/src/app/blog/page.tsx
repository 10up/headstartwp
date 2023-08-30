import Link from 'next/link';

async function getData() {
	const res = await fetch('https://js1.10up.com/wp-json/wp/v2/pages');

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default async function Page() {
	const data = await getData();

	return (
		<ul className="flex gap-4">
			{data.map((post: { id: number; slug: string; title: { rendered: string } }) => (
				<li key={post.id}>
					<Link className="text-blue-500 hover:text-blue-800" href={`/blog/${post.slug}`}>
						{post.title.rendered}
					</Link>
				</li>
			))}
		</ul>
	);
}
