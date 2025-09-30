import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import './style.css';
import './editor.css';

// Register the block using the editor/save modules exported from this folder.
registerBlockType('custom-blocks-plugin/newsletter-block', {
  edit: Edit,
  save,
});
