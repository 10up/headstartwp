import Link from 'next/link';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<nav>
				<ul className="flex gap-4 py-4">
					<li>
						<Link className="text-blue-500 hover:text-blue-800" href="/blog">
							Blog
						</Link>
					</li>
				</ul>
			</nav>
			{children}
		</section>
	);
}
