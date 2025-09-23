<?php
/**
 * Plugin Name: Custom Block Plugin
 * Description: Adds custom blocks to the Gutenberg editor that you wouldn't typically find in WordPress.
 * Version: 1.0.0
 * Author: Gage W. Reed
 * License: GPLv2
 */


/*
 * Register all blocks in the /blocks/ folder.
 */
function cbp_register_blocks() {
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }

    $blocks_dir = __DIR__ . '/blocks';
    if ( ! is_dir( $blocks_dir ) ) {
        return;
    }

    $items = scandir( $blocks_dir );
    foreach ( $items as $item ) {
        if ( in_array( $item, array( '.', '..' ), true ) ) {
            continue;
        }

        $block_path = $blocks_dir . '/' . $item;
        if ( is_dir( $block_path ) ) {
            register_block_type( $block_path );
        }
    }
}
add_action( 'init', 'cbp_register_blocks' );
 