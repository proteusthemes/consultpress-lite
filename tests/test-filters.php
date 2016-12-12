<?php

require_once dirname( __FILE__ ) . '/../inc/filters.php';

class ConsultPressLiteFiltersTest extends WP_UnitTestCase {

	function test_filter_body_class_empty() {
		$expected = [ 'consultpresslite-pt', 'is-main-menu-undefined' ];
		$actual = ConsultPressLiteFilters::body_class( [] );

		$this->assertEquals( $expected, $actual );
	}

	function test_filter_post_class() {
		$expected = [ 'clearfix', 'article' ];
		$actual = ConsultPressLiteFilters::post_class( [] );

		$this->assertEquals( $expected, $actual );
	}
}
