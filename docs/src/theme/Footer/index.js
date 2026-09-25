/* eslint-disable import/no-unresolved */

import React from 'react';
import Footer from '@theme-original/Footer';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Bottom band mirrors the footer on headstartwp.fueled.com: greyish-blue
 * ground, "Finely crafted by Fueled (formerly 10up)" with a links row,
 * centered white Fueled lockup, GitHub + LinkedIn on the right.
 */
export default function FooterWrapper(props) {
	const year = new Date().getFullYear();

	return (
		<>
			<Footer {...props} />

			<footer className="footer-fueled">
				<div className="wrap">
					<div className="text">
						<div>
							<p>
								Finely crafted by Fueled (
								<a href="https://fueled.com/blog/fueled-renewed-brand/">formerly 10up</a>
								), &copy;{year}
							</p>
							<ul className="footer-links">
								<li>
									<a href="https://github.com/10up/headstartwp/blob/trunk/LICENSE.md">
										MIT Licensed
									</a>
								</li>
								<li>
									<a href="https://headstartwp.fueled.com/news/">News</a>
								</li>
								<li>
									<a href="https://github.com/10up/headstartwp/issues">Issues</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="logo">
						<a
							href="https://fueled.com/?utm_source=referral&utm_medium=Website%20Referral&utm_campaign=headstartwp.fueled.com&utm_content=docs-footer"
							title="Fueled"
						>
							<img
								src={useBaseUrl('/img/fueled-lockup-white.svg')}
								alt="Fueled"
								width="170"
								height="33"
							/>
						</a>
					</div>

					<div className="social">
						<ul>
							<li>
								<a
									href="https://github.com/10up"
									title="10up on GitHub"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 32 32"
										aria-hidden="true"
									>
										<path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm9.502 25.502a13.4 13.4 0 0 1-5.51 3.334v-2.398c0-1.26-.432-2.188-1.297-2.781.542-.052 1.039-.125 1.492-.219s.932-.229 1.438-.406.958-.388 1.359-.633.786-.563 1.156-.953.68-.833.93-1.328.448-1.089.594-1.781.219-1.456.219-2.289c0-1.615-.526-2.99-1.578-4.125.479-1.25.427-2.609-.156-4.078l-.391-.047c-.271-.031-.758.083-1.461.344s-1.492.688-2.367 1.281a14.367 14.367 0 0 0-3.859-.516c-1.344 0-2.625.172-3.844.516-.552-.375-1.075-.685-1.57-.93s-.891-.411-1.188-.5-.573-.143-.828-.164-.419-.026-.492-.016-.125.021-.156.031c-.583 1.479-.635 2.839-.156 4.078-1.052 1.135-1.578 2.51-1.578 4.125 0 .833.073 1.596.219 2.289s.344 1.286.594 1.781.56.938.93 1.328.755.708 1.156.953.854.456 1.359.633.984.313 1.438.406.95.167 1.492.219c-.854.583-1.281 1.51-1.281 2.781v2.445A13.4 13.4 0 0 1 6.5 25.501a13.4 13.4 0 0 1-3.936-9.502A13.4 13.4 0 0 1 6.5 6.497a13.4 13.4 0 0 1 9.502-3.936 13.4 13.4 0 0 1 9.502 3.936 13.4 13.4 0 0 1 3.936 9.502 13.4 13.4 0 0 1-3.936 9.502z" />
									</svg>
									<span className="sr-only">10up on GitHub</span>
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/company/fueled/"
									title="Fueled on LinkedIn"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
									</svg>
									<span className="sr-only">Fueled on LinkedIn</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</>
	);
}
