// ProjectCard.jsx
import React from 'react';
import './GalleryCard.scss';

const GalleryCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.mainImage} alt={project.title} className="project-image" />
      <h2>{project.title}</h2>
      <h3>{project.subTitle}</h3>
      <p>{project.description}</p>
      <div className="project-details">
        <p><strong>Date:</strong> {project.date}</p>
        <p><strong>Worked With:</strong> {project.workedWith}</p>
        <p><strong>Software:</strong> {Object.values(project.softwares).join(', ')}</p>
        <p><strong>Categories:</strong> {project.category.join(', ')}</p>
      </div>
      <div className="project-gallery">
        {project.gallery.map((item) => (
          <div key={item.id} className="gallery-item">
            <img src={item.image} alt={item.description} />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <a href={project.video} target="_blank" rel="noopener noreferrer">
        <img src={project.videoThumbnail} alt="Video thumbnail" />
      </a>
    </div>
  );
};

export default GalleryCard;
