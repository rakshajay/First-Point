import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GalleryCard from '../../Components/GalleryCard/GalleryCard';

const webdev = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get server URL from environment variables
  const serverURL = import.meta.env.VITE_SERVER_URL; // VITE_API_CODE is set in your .env file

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make an Axios call to the backend
        const response = await axios.get(`${serverURL}/webdev`);
        setProjects(response.data);
        setLoading(false);
        console.log(response.data)
        console.log("serverURL", serverURL)
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error fetching projects data');
        setLoading(false);
      }
    };
 
    fetchProjects();
  }, [serverURL]);

  

  return (
    <div className="webdev-container">
      {projects.map((project) => (
        <GalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default webdev;
