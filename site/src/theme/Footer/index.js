/* eslint-disable import/no-unresolved */

import React from 'react';
import Footer from '@theme-original/Footer';

export default function FooterWrapper(props) {
	return (
		<>
			<Footer {...props} />

			<div className="footer-about">
				<div className="footer-about-inner">
					<div className="cta-careers">
						Interested in working on things like this?
						<br />
						<a href="https://10up.com/careers" className="button">
							Careers at 10up
						</a>
					</div>

					<div className="license">
						<p>
							Open source, MIT licensed.
							<br />
							<span className="copyright">Copyright &copy; 2023</span>
						</p>
					</div>
				</div>
			</div>

			<footer className="footer-10up">
				<div className="wrap">
					<a className="tenup-logo" href="https://10up.com" title="10up">
						<img src="/img/10up-logo-full.svg" alt="10up logo" width="75" height="75" />
					</a>
					<p>
						Finely crafted by 10up, ©2023.
						{/* <br />
						<a href="https://docs.google.com/document/d/1SC7f6WQs8xN4bJyZ51cn9DFcSf6BhxprfbF9JkYYgOE/edit">
							Privacy Policy
	</a> */}
					</p>

					<div className="social-media">
						<a
							href="https://www.facebook.com/10up.agency"
							title="10up on Facebook"
							aria-hidden="true"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								aria-hidden="true"
							>
								<path d="M16 0c8.837 0 16 7.163 16 16 0 8.159-6.107 14.892-14 15.876V20h5.5l.5-4h-6v-2a2 2 0 0 1 2-2h4V8h-4a6 6 0 0 0-6 6v2h-3v4h3v11.876C6.107 30.892 0 24.159 0 16 0 7.163 7.163 0 16 0z" />
							</svg>
						</a>
						<a
							href="https://twitter.com/10up"
							aria-hidden="true"
							title="10up on Twitter"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								aria-hidden="true"
							>
								<path d="M32 6.076a13.14 13.14 0 0 1-3.771 1.034 6.592 6.592 0 0 0 2.887-3.632 13.151 13.151 0 0 1-4.169 1.593 6.557 6.557 0 0 0-4.792-2.073 6.565 6.565 0 0 0-6.565 6.565c0 .515.058 1.016.17 1.496a18.64 18.64 0 0 1-13.532-6.86A6.536 6.536 0 0 0 1.339 7.5a6.563 6.563 0 0 0 2.921 5.465 6.54 6.54 0 0 1-2.974-.821l-.001.083a6.568 6.568 0 0 0 5.266 6.437 6.578 6.578 0 0 1-2.965.112 6.571 6.571 0 0 0 6.133 4.559 13.172 13.172 0 0 1-8.154 2.81c-.53 0-1.052-.031-1.566-.092a18.579 18.579 0 0 0 10.064 2.95c12.076 0 18.679-10.004 18.679-18.68 0-.285-.006-.568-.019-.849a13.347 13.347 0 0 0 3.276-3.398z" />
							</svg>
						</a>
						<a
							href="https://github.com/10up/headless"
							aria-hidden="true"
							title="10up on GitHub"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								aria-hidden="true"
							>
								<path d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm9.502 25.502a13.4 13.4 0 0 1-5.51 3.334v-2.398c0-1.26-.432-2.188-1.297-2.781.542-.052 1.039-.125 1.492-.219s.932-.229 1.438-.406.958-.388 1.359-.633.786-.563 1.156-.953.68-.833.93-1.328.448-1.089.594-1.781.219-1.456.219-2.289c0-1.615-.526-2.99-1.578-4.125.479-1.25.427-2.609-.156-4.078l-.391-.047c-.271-.031-.758.083-1.461.344s-1.492.688-2.367 1.281a14.367 14.367 0 0 0-3.859-.516c-1.344 0-2.625.172-3.844.516-.552-.375-1.075-.685-1.57-.93s-.891-.411-1.188-.5-.573-.143-.828-.164-.419-.026-.492-.016-.125.021-.156.031c-.583 1.479-.635 2.839-.156 4.078-1.052 1.135-1.578 2.51-1.578 4.125 0 .833.073 1.596.219 2.289s.344 1.286.594 1.781.56.938.93 1.328.755.708 1.156.953.854.456 1.359.633.984.313 1.438.406.95.167 1.492.219c-.854.583-1.281 1.51-1.281 2.781v2.445A13.4 13.4 0 0 1 6.5 25.501a13.4 13.4 0 0 1-3.936-9.502A13.4 13.4 0 0 1 6.5 6.497a13.4 13.4 0 0 1 9.502-3.936 13.4 13.4 0 0 1 9.502 3.936 13.4 13.4 0 0 1 3.936 9.502 13.4 13.4 0 0 1-3.936 9.502z" />
							</svg>
						</a>
					</div>
				</div>
			</footer>
		</>
	);
}
