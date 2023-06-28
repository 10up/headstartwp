<?php
/**
 * Tests covering the token endpoint.
 *
 * @package HeadlessWP
 */

namespace HeadlessWP\Tests;

use Mockery;
use function Brain\Monkey\Functions\{when, stubs, expect};
use Yoast\WPTestUtils\BrainMonkey\TestCase;
use HeadlessWP\API\TokenEndpoint;

/**
 * Tests for TokenEndpoint.
 */
class TokenEndpointTest extends TestCase {
	/**
	 * The request mock.
	 *
	 * @var TokenEndpoint
	 */
	protected $token_endpoint;

	/**
	 * Runs before each test.
	 */
	public function set_up(): void {
		parent::set_up();
		$this->token_endpoint = new TokenEndpoint();
	}

	/**
	 * Runs after each test.
	 */
	public function tear_down(): void {
		parent::tear_down();
		Mockery::close();
	}

	/**
	 * Tests that the token endpoint is adding register_rest_route to add_action.
	 */
	public function test_register() {
		$this->token_endpoint->register();

		$this->assertSame( 10, has_action( 'rest_api_init', [ $this->token_endpoint, 'register_rest_route' ] ) );
	}

	/**
	 * Tests that the token endpoint has been registered.
	 */
	public function test_register_rest_route() {
		stubs(
			[
				'register_rest_route' => function( $namespace, $route, $settings ) {},
			]
		);

		expect( 'register_rest_route' )->once()->withSomeOfArgs(
			'headless-wp/v1',
			'token',
		);

		$this->token_endpoint->register_rest_route();
	}

	/**
	 * Test the get_item_permissions_check method.
	 */
	// public function testGetItemPermissionsCheck() {
	// $get_token_mock = $this->mockStaticMethod( '\HeadlessWP\CacheFlush\CacheFlushToken', 'getToken' );
	// $get_token_mock->times( 3 )->andReturn(
	// [],
	// [
	// 'type' => 'invalid',
	// ],
	// [
	// 'type' => 'isr-revalidate',
	// ],
	// );

	// $result_one   = $this->token_endpoint->get_item_permissions_check( new \WP_REST_Request() );
	// $result_two   = $this->token_endpoint->get_item_permissions_check( new \WP_REST_Request() );
	// $result_three = $this->token_endpoint->get_item_permissions_check( new \WP_REST_Request() );

	// $this->assertFalse( $result_one );
	// $this->assertFalse( $result_two );
	// $this->assertTrue( $result_three );
	// }

	/**
	 * Test the get_item method.
	 */
	// public function testGetItem() {
	// $data = [
	// [
	// 'post_id' => 1,
	// 'path'    => '/post',
	// ],
	// [
	// 'post_type' => 'post',
	// 'path'      => '/post',
	// ],
	// [
	// 'terms_ids' => [ 1, 2 ],
	// 'paths'     => [ '/category/test', '/tag/test' ],
	// ],
	// [],
	// ];

	// $get_token_mock = $this->mockStaticMethod( '\HeadlessWP\CacheFlush\CacheFlushToken', 'getToken' );
	// $get_token_mock->times( 4 )->andReturn(
	// ...$data,
	// );

	// $response_mock = $this->getMockBuilder( 'WP_REST_Response' )->setMethods( [ 'get_data' ] )->getMock();
	// $response_mock->method( 'get_data' )->willReturn( ...$data );

	// WP_Mock::userFunction(
	// 'rest_ensure_response',
	// [
	// 'times'  => 3,
	// 'return' => function () use ( $response_mock ) {
	// return $response_mock;
	// },
	// ]
	// );

	// $result_one   = $this->token_endpoint->get_item( new \WP_REST_Request() );
	// $result_two   = $this->token_endpoint->get_item( new \WP_REST_Request() );
	// $result_three = $this->token_endpoint->get_item( new \WP_REST_Request() );
	// $result_four  = $this->token_endpoint->get_item( new \WP_REST_Request() );

	// $this->assertEquals(
	// $data[0],
	// $result_one->get_data()
	// );
	// $this->assertEquals(
	// $data[1],
	// $result_two->get_data()
	// );
	// $this->assertEquals(
	// $data[2],
	// $result_three->get_data()
	// );
	// $this->assertNull(
	// $result_four
	// );
	// }
}
