import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit.js';
import save from './save.js';
import './style.css';
import './editor.css';

registerBlockType('custom-blocks-plugin/newsletter-block', {
  edit: Edit,
  save,
});
