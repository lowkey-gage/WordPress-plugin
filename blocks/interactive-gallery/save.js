import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { images, currentImageIndex } = attributes;
    const blockProps = useBlockProps.save();

    if (!images.length) {
        return null;
    }

    return (
        <div {...blockProps}>
            <div className="interactive-gallery" data-total-images={images.length}>
                <button 
                    type="button"
                    className="nav-button prev"
                    aria-label="Previous image"
                    disabled={currentImageIndex === 0}
                >
                    ❮
                </button>

                <div className="gallery-image-container">
                    {images.map((image, index) => (
                        <div 
                            key={image.id} 
                            className="gallery-slide"
                            data-index={index}
                            style={{
                                opacity: index === currentImageIndex ? 1 : 0,
                                visibility: index === currentImageIndex ? 'visible' : 'hidden'
                            }}
                        >
                            <div className="gallery-image-wrapper">
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="gallery-image"
                                />
                            </div>
                            {image.caption && (
                                <figcaption className="gallery-caption">{image.caption}</figcaption>
                            )}
                        </div>
                    ))}
                </div>

                <button 
                    type="button"
                    className="nav-button next"
                    aria-label="Next image"
                    disabled={currentImageIndex === images.length - 1}
                >
                    ❯
                </button>
            </div>
        </div>
    );
}