// This file contains the JavaScript functionality for the customizable block in the WordPress editor.

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType('custom-blocks-plugin/example-block', {
    title: 'Example Block',
    icon: 'smiley',
    category: 'common',
    attributes: {
        content: {
            type: 'string',
            source: 'html',
            selector: 'p',
        },
    },
    edit({ attributes, setAttributes }) {
        const { content } = attributes;

        const onChangeContent = (newContent) => {
            setAttributes({ content: newContent });
        };

        return (
            <div className="example-block">
                <RichText
                    tagName="p"
                    onChange={onChangeContent}
                    value={content}
                    placeholder="Enter your content here..."
                />
            </div>
        );
    },
    save({ attributes }) {
        const { content } = attributes;

        return (
            <div className="example-block">
                <RichText.Content tagName="p" value={content} />
            </div>
        );
    },
});