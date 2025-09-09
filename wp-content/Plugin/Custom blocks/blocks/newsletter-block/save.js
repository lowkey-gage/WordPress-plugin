import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export default function save({ attributes }) {
    const { heading, imageUrl, imageDesc, mainText, expandedText } = attributes;

    return (
        <div {...useBlockProps.save()}>
            {heading && <RichText.Content tagName="h2" value={heading} />}
            {imageUrl && <img src={imageUrl} alt={imageDesc} />}
            {imageDesc && <p className="source">{imageDesc}</p>}
            {mainText && <RichText.Content tagName="p" value={mainText} />}
            {expandedText && (
                <div className="expanded-text" style={{ display: 'none' }}>
                    <RichText.Content tagName="p" value={expandedText} />
                </div>
            )}
            <button className="toggle-button" type="button">Read More ▼</button>
        </div>
    );
}
