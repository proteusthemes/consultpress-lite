<?php
/**
 * Load the Customizer with some custom extended addons
 *
 * @package consultinglite-pt
 * @link http://codex.wordpress.org/Theme_Customization_API
 */

/**
 * This funtion is only called when the user is actually on the customizer page
 *
 * @param  WP_Customize_Manager $wp_customize
 */
if ( ! function_exists( 'consultinglite_customizer' ) ) {
	function consultinglite_customizer( $wp_customize ) {
		// Add required files.
		ConsultingLiteHelpers::load_file( '/inc/customizer/class-customize-base.php' );

		new ConsultingLite_Customizer_Base( $wp_customize );
	}
	add_action( 'customize_register', 'consultinglite_customizer' );
}


/**
 * Takes care for the frontend output from the customizer and nothing else
 */
if ( ! function_exists( 'consultinglite_customizer_frontend' ) && ! class_exists( 'ConsultingLite_Customize_Frontent' ) ) {
	function consultinglite_customizer_frontend() {
		ConsultingLiteHelpers::load_file( '/inc/customizer/class-customize-frontend.php' );
		$consultinglite_customize_frontent = new ConsultingLite_Customize_Frontent();
	}
	add_action( 'init', 'consultinglite_customizer_frontend' );
}
