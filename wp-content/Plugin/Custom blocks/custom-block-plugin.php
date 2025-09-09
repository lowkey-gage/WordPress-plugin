<?php
/**
 * Plugin Name: Custom Block Plugin
 * Description: Adds custom blocks to the Gutenberg editor that you wouldn't typically find in WordPress.
 * Version: 1.0.0
 * Author: Gage W. Reed
 * License: GPLv2
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register all blocks in the /blocks/ folder.
 */
function cbp_register_blocks() {
    if ( ! function_exists( 'register_block_type' ) ) {
        require_once ABSPATH . 'wp-includes/blocks.php';
    }
    register_block_type( __DIR__ . '/blocks/newsletter-block' );
}
add_action( 'init', 'cbp_register_blocks' );
