<?php
/**
 * Base JWT Token Class
 *
 * @package HeadlessWP
 */

namespace HeadlessWP;

use HeadlessWP\JWT\JWT;

/**
 * Class with static methods to generate and parse capability tokens.
 */
abstract class BaseToken {
    /**
	 * Generate token using the given payload.
	 *
	 * @param array $payload The payload to use for the token.
	 */
	public static function generate( $payload ) {
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
	 * @throws \Exception If the private key is not found.
	 */
	private static function get_private_key() {
		if ( defined( '10UP_HEADLESS_JWT_AUTH_KEY' ) ) {
			return TENUP_HEADLESS_JWT_AUTH_KEY;
		}

		if ( defined( 'SECURE_AUTH_KEY' ) ) {
			return SECURE_AUTH_KEY;
		}

		// No secure auth key found. Throw an error.
		$error = new \WP_Error(
			'no-secure-auth-key',
			'Please define either SECURE_AUTH_KEY or TENUP_HEADLESS_JWT_AUTH_KEY in your wp-config.php file.'
		);

		throw new \Exception( $error->get_error_message() );
	}

    /**
	 * Decode capability tokens if present.
	 */
	protected static function get_payload_from_token() {
		// Get HTTP Authorization Header.
		$header = isset( $_SERVER['HTTP_AUTHORIZATION'] )
		? sanitize_text_field( $_SERVER['HTTP_AUTHORIZATION'] )
		: false;

		// Check for alternative header.
		if ( ! $header && isset( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ) ) {
			$header = sanitize_text_field( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] );
		}

		// No Authorization Header is present.
		if ( ! $header ) {
			return null;
		}

		// Get and parse the token.
		try {
			list( $token ) = sscanf( $header, 'Bearer %s' );
			$payload       = JWT::decode(
				$token,
				self::get_private_key(),
				array( 'HS256' )
			);
		} catch ( \Exception $e ) {
			// Token is not valid.
			return null;
		}

		// Return the parsed token.
		return $payload;
	}
}