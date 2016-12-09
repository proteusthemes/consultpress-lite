<?php
/**
 * Register sidebars for ConsultingLite
 *
 * @package consultinglite-pt
 */

function consultinglite_sidebars() {
	// Blog Sidebar.
	register_sidebar(
		array(
			'name'          => esc_html__( 'Blog Sidebar', 'consulting-lite' ),
			'id'            => 'blog-sidebar',
			'description'   => esc_html__( 'Sidebar on the blog layout.', 'consulting-lite' ),
			'class'         => 'blog  sidebar',
			'before_widget' => '<div class="widget  %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="sidebar__headings">',
			'after_title'   => '</h4>',
		)
	);

	// Regular Page Sidebar.
	register_sidebar(
		array(
			'name'          => esc_html__( 'Regular Page Sidebar', 'consulting-lite' ),
			'id'            => 'regular-page-sidebar',
			'description'   => esc_html__( 'Sidebar on the regular page.', 'consulting-lite' ),
			'class'         => 'sidebar',
			'before_widget' => '<div class="widget  %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h4 class="sidebar__headings">',
			'after_title'   => '</h4>',
		)
	);

	// Header Widgets.
	register_sidebar(
		array(
			'name'          => esc_html__( 'Header', 'consulting-lite' ),
			'id'            => 'header-widgets',
			'description'   => esc_html__( 'Header widget area for Text Widget.', 'consulting-lite' ),
			'before_widget' => '<div class="widget  %2$s">',
			'after_widget'  => '</div>',
		)
	);

	// Footer.
	register_sidebar(
		array(
			'name'          => esc_html__( 'Footer', 'consulting-lite' ),
			'id'            => 'footer-widgets',
			'description'   => esc_html__( 'Footer area works best with 3 widgets.', 'consulting-lite' ),
			'before_widget' => '<div class="col-xs-12  col-lg-4"><div class="widget  %2$s">',
			'after_widget'  => '</div></div>',
			'before_title'  => '<h4 class="footer-top__heading">',
			'after_title'   => '</h4>',
		)
	);
}
add_action( 'widgets_init', 'consultinglite_sidebars' );
