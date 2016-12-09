<?php

/**
 * Configure WP options
 */


$_tests_dir = getenv('WP_TESTS_DIR');
if ( !$_tests_dir ) $_tests_dir = '/tmp/wordpress-tests-lib';

require_once $_tests_dir . '/includes/functions.php';

// function _manually_load_theme() {
// 	require dirname( __FILE__ ) . '/../functions.php';
// }
// tests_add_filter( 'setup_theme', '_manually_load_theme' );

require $_tests_dir . '/includes/bootstrap.php';

require __DIR__ . '/../vendor/autoload.php';
