// Architecture.jsx
import React from 'react';
import GalleryCard from '../../Components/GalleryCard/GalleryCard';

const projects = [
  {
    id: '1',
    title: 'Cogni-Craft',
    subTitle: 'Master Thesis (Neuroscience, Architecture, AI)',
    mainImage: 'Thesis1.1',
    gallery: [
      { id: '1.1', description: 'SCI-Arc EDGE Symposium, application demo-live', image: 'Thesis1' },
      { id: '1.2', description: 'SCI-Arc EDGE Symposium, application demo and result', image: 'Thesis' },
      // more images...
    ],
    date: 'Sep-2023',
    workedWith: 'SCI-Arc',
    description: 'This app, developed for my thesis...',
    softwares: {
      concept: 'Miro, Figma',
      rendering: 'Unreal engine',
      presentation: 'Adobe Premier Pro, Photoshop, Illustrator',
      technology: 'Stable diffusion, Chat-GPT API',
      device: 'UltraCortex EEG device',
      codingLanguages: 'Python'
    },
    videoThumbnail: 'thesis4',
    video: 'https://www.facebook.com/ZoyaJewels/videos/546032976082663/',
    category: ['Architecture', 'Technology', 'AI'],
    publications: ''
  },
  // Add other project objects here...
];

const Architecture = () => {
  return (
    <div className="architecture-container">
      {projects.map((project) => (
        <GalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Architecture;
