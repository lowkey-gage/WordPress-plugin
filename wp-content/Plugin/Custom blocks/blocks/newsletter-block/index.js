import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit.js';
import save from './save.js';
import './style.css';
import './editor.css';

const { registerBlockType } = wp.blocks;

registerBlockType('custom-blocks-plugin/newsletter-block', {
  edit: () => wp.element.createElement("div", {}, "Newsletter Block (Editor)"),
  save: () => wp.element.createElement("div", {}, "Newsletter Block (Frontend)"),
  edit: Edit,
  save,
});
