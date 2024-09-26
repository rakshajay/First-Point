import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GalleryCard from '../../Components/GalleryCard/GalleryCard';
import './Architecture.scss'; // Assuming you have styles

const Architecture = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get server URL from environment variables
  const serverURL = import.meta.env.VITE_SERVER_URL; // Assuming VITE_API_CODE is set in your .env file

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make an Axios call to the backend
        const response = await axios.get(`${serverURL}/architecture`);
        setProjects(response.data);
        console.log("response.data", response.data)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error fetching projects data');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [serverURL]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="architecture-container">
      {projects.map((project) => (
        <GalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default Architecture;
