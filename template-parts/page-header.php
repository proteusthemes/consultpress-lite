<?php
/**
 * The page title part of the header
 *
 * @package consultinglite-pt
 */

$consultinglite_blog_id = absint( get_option( 'page_for_posts' ) );

?>

<div class="header__page-header  page-header">
	<?php
	$consultinglite_main_tag = 'h1';

	if ( is_home() || ( is_single() && 'post' === get_post_type() ) ) {
		$consultinglite_title    = 0 === $consultinglite_blog_id ? esc_html__( 'Blog', 'consulting-lite' ) : get_the_title( $consultinglite_blog_id );

		if ( is_single() ) {
			$consultinglite_main_tag = 'h2';
		}
	}
	elseif ( is_category() || is_tag() || is_author() || is_post_type_archive() || is_tax() || is_day() || is_month() || is_year() ) {
		$consultinglite_title = get_the_archive_title();
	}
	elseif ( is_search() ) {
		$consultinglite_title = esc_html__( 'Search Results For' , 'consulting-lite' ) . ' &quot;' . get_search_query() . '&quot;';
	}
	elseif ( is_404() ) {
		$consultinglite_title = esc_html__( 'Error 404' , 'consulting-lite' );
	}
	else {
		$consultinglite_title    = get_the_title();
	}

	?>

	<?php printf( '<%1$s class="page-header__title">%2$s</%1$s>', tag_escape( $consultinglite_main_tag ), wp_kses_post( $consultinglite_title ) ); ?>

</div>
