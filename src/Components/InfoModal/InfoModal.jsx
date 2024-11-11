import React from 'react';
import './InfoModal.scss'; // Import the SCSS file for styling

function InfoModal() {
  return (
    <div className="info-modal">
      <h2 className="info-modal__title">About the Project</h2>
      <p className="info-modal__description">
      This project is a collaborative and interactive digital installation. Visitors to this portfolio page can actively contribute by uploading their own 3D files, leaving a favorite object within this evolving artwork. Leveraging my skills in digital design and coding, I use a text-to-AI API to integrate user submissions in real time, creating a dynamic, community-driven installation in Three.js.
      </p>
    </div>
  );
}

export default InfoModal;
