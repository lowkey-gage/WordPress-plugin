import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, TextareaControl, PanelBody } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    header, imageUrl, imageDesc, mainText, expandedText, isExpanded
  } = attributes;

  const blockProps = useBlockProps();

  return (
    <div {...blockProps} className="newsletter-block">
      <RichText
        tagName="h2"
        value={header}
        onChange={(value) => setAttributes({ header: value })}
        placeholder="Enter header..."
      />

      <MediaUpload
        onSelect={(media) => setAttributes({ imageUrl: media.url })}
        allowedTypes={['image']}
        render={({ open }) => (
          <Button onClick={open} isSecondary>
            {imageUrl ? <img src={imageUrl} alt="" /> : 'Upload Image'}
          </Button>
        )}
      />

      <RichText
        tagName="p"
        value={imageDesc}
        onChange={(value) => setAttributes({ imageDesc: value })}
        placeholder="Image description..."
      />

      <TextareaControl
        label="Main Text"
        value={mainText}
        onChange={(value) => setAttributes({ mainText: value })}
      />

      {isExpanded && (
        <TextareaControl
          label="Expanded Text"
          value={expandedText}
          onChange={(value) => setAttributes({ expandedText: value })}
        />
      )}

      <Button
        isPrimary
        onClick={() => setAttributes({ isExpanded: !isExpanded })}
      >
        {isExpanded ? 'Hide Extra Text' : 'Show More'}
      </Button>
    </div>
  );
}