import { registerBlockType } from '@wordpress/blocks';
import { TextControl } from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('custom/example-block', {
    title: 'Example Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        content: {
            type: 'string',
            source: 'text',
            selector: 'p',
        },
    },
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();
        
        return (
            <div {...blockProps}>
                <TextControl
                    label="Content"
                    value={attributes.content}
                    onChange={(content) => setAttributes({ content })}
                />
            </div>
        );
    },
    save({ attributes }) {
        const blockProps = useBlockProps.save();
        
        return (
            <div {...blockProps}>
                <p>{attributes.content}</p>
            </div>
        );
    },
});