/*
 * Browser-ready build for the Interactive Gallery block.
 * Uses the global `wp` object (wp.blocks, wp.element, wp.blockEditor, wp.components)
 * so it can be loaded directly by WordPress without a bundler.
 */
(function (wp) {
  if (!wp || !wp.blocks) {
    return;
  }

  var registerBlockType = wp.blocks.registerBlockType;
  var el = wp.element.createElement;
  var Fragment = wp.element.Fragment;
  var RichText = (wp.blockEditor && wp.blockEditor.RichText) || (wp.richText || {});
  var useBlockProps = (wp.blockEditor && wp.blockEditor.useBlockProps) || function () { return {}; };
  var MediaUpload = (wp.blockEditor && wp.blockEditor.MediaUpload) || (wp.editor && wp.editor.MediaUpload) || null;
  var Button = (wp.components && wp.components.Button) || function (props) { return el('button', props, props.children); };
  var Placeholder = (wp.components && wp.components.Placeholder) || function (props) { return el('div', null, props.children); };

  function normalizeMediaSelection(selection) {
    if (!selection) return [];
    if (Array.isArray(selection)) return selection.map(function (image) {
      return {
        url: image.url || (image.sizes && image.sizes.full && image.sizes.full.url) || '',
        alt: image.alt || '',
        id: image.id || 0,
        caption: image.caption || ''
      };
    });
    // single object
    return [{
      url: selection.url || (selection.sizes && selection.sizes.full && selection.sizes.full.url) || '',
      alt: selection.alt || '',
      id: selection.id || 0,
      caption: selection.caption || ''
    }];
  }

  registerBlockType('custom-blocks-plugin/interactive-gallery', {
    edit: function (props) {
      var attributes = props.attributes || {};
      var setAttributes = props.setAttributes || function () {};
      var images = attributes.images || [];
      var currentImageIndex = typeof attributes.currentImageIndex === 'number' ? attributes.currentImageIndex : 0;

      function onSelectImages(selection) {
        var normalized = normalizeMediaSelection(selection);
        setAttributes({ images: normalized, currentImageIndex: 0 });
      }

      function navigate(dir) {
        var newIndex = currentImageIndex + dir;
        if (newIndex >= 0 && newIndex < images.length) {
          setAttributes({ currentImageIndex: newIndex });
        }
      }

      function updateCaption(newCaption) {
        var newImages = images.slice();
        newImages[currentImageIndex] = Object.assign({}, newImages[currentImageIndex], { caption: newCaption });
        setAttributes({ images: newImages });
      }

      if (!images || images.length === 0) {
        return el('div', useBlockProps(),
          el(Placeholder, { icon: 'format-gallery', label: 'Interactive Gallery', instructions: 'Add images from the Media Library or upload new ones.' },
            MediaUpload ? el(MediaUpload, {
              onSelect: onSelectImages,
              allowedTypes: ['image'],
              multiple: true,
              render: function (obj) { return el(Button, { onClick: obj.open, variant: 'primary' }, 'Add Images'); }
            }) : el('div', null, 'MediaUpload unavailable in this environment')
          )
        );
      }

      return el('div', useBlockProps(),
        el('div', { className: 'gallery-controls-top' },
          MediaUpload ? el(MediaUpload, {
            onSelect: onSelectImages,
            allowedTypes: ['image'],
            multiple: true,
            render: function (obj) { return el(Button, { onClick: obj.open, variant: 'secondary', className: 'gallery-edit-button' }, 'Edit Gallery'); }
          }) : null
        ),
        el('div', { className: 'interactive-gallery' },
          el('button', { type: 'button', className: 'nav-button prev', onClick: function () { return navigate(-1); }, disabled: currentImageIndex === 0 }, '❮'),
          el('div', { className: 'gallery-image-container' },
            images.map(function (img, idx) {
              var isActive = idx === currentImageIndex;
              var isPrev = idx === currentImageIndex - 1;
              var isNext = idx === currentImageIndex + 1;
              var slideClass = 'gallery-slide' + (isActive ? ' active' : '') + (isPrev ? ' prev' : '') + (isNext ? ' next' : '');
              
              return el('div', { key: img.id || idx, className: slideClass, 'data-index': idx },
                el('div', { className: 'gallery-image-wrapper' },
                  el('img', { src: img.url, alt: img.alt, className: 'gallery-image' })
                ),
                isActive ? el(RichText, {
                  tagName: 'figcaption',
                  className: 'gallery-caption',
                  value: img.caption || '',
                  onChange: updateCaption,
                  placeholder: 'Write caption…'
                }) : (img.caption ? el('figcaption', { className: 'gallery-caption' }, img.caption) : null)
              );
            })
          ),
          el('button', { type: 'button', className: 'nav-button next', onClick: function () { return navigate(1); }, disabled: currentImageIndex === images.length - 1 }, '❯')
        )
      );
    },

    save: function (props) {
      var attributes = props.attributes || {};
      var images = attributes.images || [];
      var currentImageIndex = typeof attributes.currentImageIndex === 'number' ? attributes.currentImageIndex : 0;

      return el('div', (useBlockProps.save && useBlockProps.save()) || {},
        el('div', { className: 'interactive-gallery', 'data-total-images': images.length },
          el('button', { type: 'button', className: 'nav-button prev', 'aria-label': 'Previous image', disabled: currentImageIndex === 0 }, '❮'),
          el('div', { className: 'gallery-image-container' },
            images.map(function (image, index) {
              return el('div', {
                key: image.id || index,
                className: 'gallery-slide',
                'data-index': index
              },
                el('div', { className: 'gallery-image-wrapper' },
                  el('img', { src: image.url, alt: image.alt, className: 'gallery-image' })
                ),
                image.caption ? el('figcaption', { className: 'gallery-caption' }, image.caption) : null
              );
            })
          ),
          el('button', { type: 'button', className: 'nav-button next', 'aria-label': 'Next image', disabled: currentImageIndex === images.length - 1 }, '❯')
        )
      );
    }
  });
})(window.wp);
