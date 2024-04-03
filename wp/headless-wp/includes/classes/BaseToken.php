<?php
/**
 * Base JWT Token Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use HeadlessWP\JWT\JWT;
use WP_Error;
use Exception;

/**
 * Class with static methods to generate and parse capability tokens.
 */
abstract class BaseToken {

	/**
	 * Generate token using the given payload.
	 *
	 * @param array $payload The payload to use for the token.
	 */
	public static function generate( array $payload ): string {
		// Get the current time to compute issue and expiration time.
		$issued_at = time();

		// Generate payload.
		$payload = array_merge(
			[
				'iat'       => $issued_at,
				'exp'       => $issued_at + 5 * MINUTE_IN_SECONDS,
				'generator' => '10up-headless-wp',
			],
			$payload
		);

		return JWT::encode( $payload, self::get_private_key() );
	}

	/**
	 * Return the private key used to encode and decode tokens.
	 *
	 * @throws Exception If the private key is not found.
	 *
	 * @return string
	 */
	private static function get_private_key() {
		if ( defined( 'TENUP_HEADLESS_JWT_AUTH_KEY' ) ) {
			return TENUP_HEADLESS_JWT_AUTH_KEY;
		}

		if ( defined( 'SECURE_AUTH_KEY' ) ) {
			return SECURE_AUTH_KEY;
		}

		// No secure auth key found. Throw an error.
		$error = new WP_Error(
			'no-secure-auth-key',
			__( 'Please define either SECURE_AUTH_KEY or TENUP_HEADLESS_JWT_AUTH_KEY in your wp-config.php file.', 'headless-wp' )
		);

		throw new Exception(
			wp_kses_post(
				$error->get_error_message()
			)
		);
	}

	/**
	 * Decode capability tokens if present.
	 *
	 * @return object|null
	 */
	public static function get_payload_from_token( string $token = '' ) {
		// Get HTTP Authorization Header.
		$header = isset( $_SERVER['HTTP_AUTHORIZATION'] )
		? sanitize_text_field( wp_unslash( $_SERVER['HTTP_AUTHORIZATION'] ) )
		: false;

		// Check for alternative header.
		if ( ! $header && isset( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ) ) {
			$header = sanitize_text_field( wp_unslash( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ) );
		}

		if ( ! $header && isset( $_SERVER['HTTP_X_HEADSTARTWP_AUTHORIZATION'] ) ) {
			$header = sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_HEADSTARTWP_AUTHORIZATION'] ) );
		}

		// No Authorization Header is present.
		if ( ! $header && ! $token ) {
			return null;
		}

		// Get and parse the token.
		try {
			if ( ! $token ) {
				[$token] = sscanf( $header, 'Bearer %s' );
			}

			if ( empty( $token ) ) {
				return null;
			}

			$payload = JWT::decode(
				$token,
				self::get_private_key(),
				[ 'HS256' ]
			);
		} catch ( Exception ) {
			// Token is not valid.
			return null;
		}

		// Return the parsed token.
		return $payload;
	}
}
