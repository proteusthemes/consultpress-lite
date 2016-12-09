<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package consultinglite-pt
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="article__content">

		<?php the_content(); ?>

		<!-- Multi Page in One Post -->
		<?php
			$consultinglite_args = array(
				'before'      => '<div class="multi-page  clearfix">' . /* translators: after that comes pagination like 1, 2, 3 ... 10 */ esc_html__( 'Pages:', 'consulting-lite' ) . ' &nbsp; ',
				'after'       => '</div>',
				'link_before' => '<span class="btn  btn-primary">',
				'link_after'  => '</span>',
				'echo'        => 1,
			);
			wp_link_pages( $consultinglite_args );
		?>
	</div><!-- .article__content -->
</article><!-- .article -->
