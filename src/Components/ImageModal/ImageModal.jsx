import React, { useState } from 'react';
import './ImageModal.scss';

const ImageModal = ({ images, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content">
        <img
          className="modal__image"
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
        />
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <button className="modal__arrow modal__arrow--left" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="modal__arrow modal__arrow--right" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
