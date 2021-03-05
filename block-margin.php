<?php
/**
 * Plugin Name: Block Margin
 * Plugin URI:  https://github.com/happyprime/block-margin/
 * Description: Add margin controls to blocks.
 * Version:     0.1.0
 * Author:      Happy Prime
 * Author URI:  https://happyprime.co/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

namespace BlockMargin;

add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets', 11 );
add_action( 'init', __NAMESPACE__ . '\block_supports_init' );

/**
 * Enqueue assets for the block editor.
 */
function enqueue_block_editor_assets() {
	$asset_data = require_once __DIR__ . '/build/index.asset.php';

	wp_enqueue_script(
		'block-margin',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		$asset_data['dependencies'],
		$asset_data['version'],
		true
	);
}

/**
 * Register the margin attribute and class application.
 */
function block_supports_init() {
	\WP_Block_Supports::get_instance()->register(
		'margin',
		array(
			'register_attribute' => __NAMESPACE__ . '\register_attribute',
			'apply'              => __NAMESPACE__ . '\apply',
		)
	);
}

/**
 * Register the margin attribute for blocks.
 *
 * @param WP_Block_Type $block_type Block Type.
 */
function register_attribute( $block_type ) {
	$excluded_blocks = apply_filters( 'block_margin_excluded_blocks', array() );

	if ( in_array( $block_type->name, $excluded_blocks, true ) ) {
		return;
	}

	if ( ! $block_type->attributes ) {
		$block_type->attributes = array();
	}

	$default_options = array( '', 'small', 'medium', 'large', 'larger' );
	$options         = apply_filters( 'block_margin_options', $default_options );

	if ( ! array_key_exists( 'margin', $block_type->attributes ) ) {
		$block_type->attributes['margin'] = array(
			'type' => 'string',
			'enum' => $options,
		);
	}
}

/**
 * Add CSS class for margin to the incoming attributes array.
 * This will be applied to the block markup in the front-end.
 *
 * @param WP_Block_Type $block_type       Block Type.
 * @param array         $block_attributes Block attributes.
 *
 * @return array Block margin CSS classes and inline styles.
 */
function apply( $block_type, $block_attributes ) {
	$has_block_margin = array_key_exists( 'margin', $block_attributes );

	if ( $has_block_margin ) {
		$attributes['class'] = sprintf( 'has-%s-margin-top', $block_attributes['margin'] );
	}

	return $attributes;
}
