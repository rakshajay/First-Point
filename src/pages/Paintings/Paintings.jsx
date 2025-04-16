import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Paintings.scss'

const Paintings = () => {
  // Array of images for the gallery
  const images = [
    {
      original: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780134/Painting2_ufxzfw.jpg',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+1',
      description: 'This is the first image description.',
    },
    {
      original: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780135/Painting3_ckoyad.jpg',
      thumbnail: 'https://via.placeholder.com/150x100?text=Thumb+2',
      description: 'This is the second image description.',
    },
    {
      original: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780207/Painting5_hb67uw.jpg',
      thumbnail: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780207/Painting5_hb67uw.jpg',
      description: 'This is the third image description.',
    },
    {
      original: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780140/Painting4_carvej.jpg',
      thumbnail: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780140/Painting4_carvej.jpg',
      description: 'This is the third image description.',
    },
    {
      original: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780136/Painting1_oiia3u.jpg',
      thumbnail: 'https://res.cloudinary.com/dy1q2hcit/image/upload/v1744780136/Painting1_oiia3u.jpg',
      description: 'This is the third image description.',
    },
  ];

  return (
    <div className="image-gallery">
      <ImageGallery
        items={images} // Pass the images array
        //showThumbnails={true} // Show thumbnail navigation
        showFullscreenButton={true} // Allow fullscreen viewing
        showPlayButton={true} // Enable autoplay button
        autoPlay={true} // Autoplay slides
        slideInterval={3000} // Set autoplay interval
        showNav={true} // Show navigation arrows
        renderItem={(item) => (
          <div className="image-gallery_items">
            <img src={item.original} alt="Gallery Item" />
           
          </div>
        )}
      />
    </div>
  );
};

export default Paintings;
