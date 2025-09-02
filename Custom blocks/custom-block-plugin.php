<?php
/**
 * Plugin Name: Custom Block Plugin
 * Description: This plugin is made to add custom blocks to the Gutenberg editor you typically wouldnt find in the WordPress website editor.
 * Version: 1.0.0
 * Author: Gage W. Reed
 * License: GPLv2
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/* Register block assets.*/
function cbp_register_blocks() {
    // Register the block script.
    wp_register_script(
        'cbp-example-block',
        plugins_url( 'blocks/example-block.js', 'example-block.js'),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        filemtime( plugin_dir_path( 'example-block.js' ) . 'blocks/example-block.js' )
    );

    // Register the block type.
    register_block_type( 'cbp/example-block', array(
        'editor_script' => 'cbp-example-block',
        'style' => 'cbp-block-style',
    ) );
}
