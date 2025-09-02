import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    header, imageUrl, imageDesc, mainText, expandedText, isExpanded
  } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} className="newsletter-block">
      <h2>{header}</h2>
      {imageUrl && <img src={imageUrl} alt="" />}
      <p>{imageDesc}</p>
      <div className="main-text">{mainText}</div>
      {isExpanded && <div className="expanded-text">{expandedText}</div>}
    </div>
  );
}