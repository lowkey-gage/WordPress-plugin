import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { heading, imageUrl, imageDesc, mainText, expandedText, isExpanded } = attributes;

    const toggleExpanded = () => setAttributes({ isExpanded: !isExpanded });

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                {/* Title and source desc */}
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
                /* Image upload */
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
                /* main and expanded text */
                tagName="p"
                placeholder="Enter newsletter text..."
                value={mainText}
                onChange={(value) => setAttributes({ mainText: value })}
            />

            {isExpanded && (
                <RichText
                    tagName="p"
                    placeholder="Enter expanded text..."
                    value={expandedText}
                    onChange={(value) => setAttributes({ expandedText: value })}
                />
            )}

            <Button onClick={toggleExpanded} variant="secondary">
                {isExpanded ? 'Read Less \u25b2' : 'Read More \u25bc'}
            </Button>
        </div>
    );
}
