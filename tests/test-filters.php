<?php

require_once dirname( __FILE__ ) . '/../inc/filters.php';

class ConsultingLiteFiltersTest extends WP_UnitTestCase {

	function test_filter_body_class_empty() {
		$expected = [ 'consultinglite-pt', 'is-main-menu-undefined' ];
		$actual = ConsultingLiteFilters::body_class( [] );

		$this->assertEquals( $expected, $actual );
	}

	function test_filter_post_class() {
		$expected = [ 'clearfix', 'article' ];
		$actual = ConsultingLiteFilters::post_class( [] );

		$this->assertEquals( $expected, $actual );
	}
}
