import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Paintings = () => {
  // Array of images for the gallery
  const images = [
    {
      original: 'https://via.placeholder.com/800x400?text=Image+1',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+1',
      description: 'This is the first image description.',
    },
    {
      original: 'https://via.placeholder.com/800x400?text=Image+2',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+2',
      description: 'This is the second image description.',
    },
    {
      original: 'https://via.placeholder.com/800x400?text=Image+3',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+3',
      description: 'This is the third image description.',
    },
  ];

  return (
    <div style={{ margin: '20px' }}>
      <ImageGallery
        items={images} // Pass the images array
        showThumbnails={true} // Show thumbnail navigation
        showFullscreenButton={true} // Allow fullscreen viewing
        showPlayButton={true} // Enable autoplay button
        autoPlay={true} // Autoplay slides
        slideInterval={3000} // Set autoplay interval
        showNav={true} // Show navigation arrows
        renderItem={(item) => (
          <div>
            <img src={item.original} alt="Gallery Item" style={{ width: '100%' }} />
            <p style={{ textAlign: 'center', marginTop: '10px' }}>{item.description}</p>
          </div>
        )}
      />
    </div>
  );
};

export default Paintings;
