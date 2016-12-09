<?php
/**
 * Header Widget Area
 *
 * @package consultinglite-pt
 */

?>

<?php if ( is_active_sidebar( 'header-widgets' ) ) : ?>
	<div class="sidebar__header-widgets  header-widgets  hidden-md-down">
		<?php dynamic_sidebar( apply_filters( 'consultinglite_header_widgets', 'header-widgets', get_the_ID() ) ); ?>
	</div>
<?php endif; ?>
