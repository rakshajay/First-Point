import React, { useState } from 'react';
import './GalleryCard.scss';
import { useNavigate } from 'react-router-dom';
import ImageModal from '../ImageModal/ImageModal'; // Import your modal component

const serverURL = "https://portfolio-backend-sa3o.onrender.com"

const GalleryCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Track the selected image
  const navigate = useNavigate(); 
  const displayModal = (image) => {
    setSelectedImage(image); // Set the clicked image
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
  };


  return (
    <div className="project-card">
      <a href={project.link}><img src={`${serverURL}/${project.mainImage}`} alt={project.title} className="project-image"/></a>
      <h2>{project.title}</h2>
      <h3>{project.subTitle}</h3>
      <div className="project-details">
        <p><strong>Date:</strong> {project.date}</p>
        <p><strong>Worked With:</strong> {project.workedWith}</p>
        <p id="small" >{project.description}</p>
      </div>
      <div className="project-gallery">
        {project.gallery.map((item) => (
          <div key={item.id} className="gallery-item">
            <img 
              onClick={() => displayModal(item.image)} // Display the modal on click
              src={`${serverURL}/${item.image}`} 
              alt={item.description} 
            />
          </div>
        ))}
      </div> 
      <a href={project.video} target="_blank" rel="noopener noreferrer">
        {/* <img src={`${serverURL}/${project.videoThumbnail}`} alt="Video thumbnail" /> */}
      </a>

      {modalOpen && (
        <ImageModal 
          images={project.gallery.map(item => `${serverURL}/${item.image}`)} // Pass all gallery images to the modal
          isOpen={modalOpen} 
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GalleryCard;
