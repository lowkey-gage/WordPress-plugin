import { useState } from '@wordpress/element';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { heading, imageUrl, imageDesc, mainText, expandedText, isExpanded } = attributes;
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title="Newsletter Settings">
                    <TextControl
                        label="Source Description"
                        value={imageDesc}
                        onChange={(value) => setAttributes({ imageDesc: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <RichText
                tagName="h2"
                placeholder="Enter heading..."
                value={heading}
                onChange={(value) => setAttributes({ heading: value })}
            />

            <MediaUpload
                onSelect={(media) => setAttributes({ imageUrl: media.url })}
                allowedTypes={['image']}
                render={({ open }) => (
                    <Button onClick={open} variant="primary">
                        {imageUrl ? 'Change Image' : 'Upload Image'}
                    </Button>
                )}
            />

            {imageUrl && <img src={imageUrl} alt={imageDesc} />}
            {imageDesc && <p className="source">{imageDesc}</p>}

            <RichText
                tagName="p"
                placeholder="Enter newsletter text..."
                value={mainText}
                onChange={(value) => setAttributes({ mainText: value })}
            />

            {expanded && (
                <RichText
                    tagName="p"
                    placeholder="Enter expanded text..."
                    value={expandedText}
                    onChange={(value) => setAttributes({ expandedText: value })}
                />
            )}

            <Button onClick={toggleExpanded} variant="secondary">
                {expanded ? 'Read Less ▲' : 'Read More ▼'}
            </Button>
        </div>
    );
}
