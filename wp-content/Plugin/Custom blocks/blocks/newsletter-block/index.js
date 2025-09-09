import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';
import './style.css';
import './editor.css';

registerBlockType('my-plugin/newsletter-block', {
    edit: Edit,
    save,
});
