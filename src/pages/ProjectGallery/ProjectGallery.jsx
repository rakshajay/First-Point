import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import GalleryCard from '../../Components/GalleryCard/GalleryCard';
import "./ProjectGallery.scss"

const ProjectGallery = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get server URL from environment variables or hardcoded fallback
  const serverURL = "https://portfolio-backend-sa3o.onrender.com";
  // const serverURL = "http://localhost:5050";
  // Use React Router's useLocation to get the current path
  const location = useLocation();
  const endpoint = `${serverURL}${location.pathname}`; // Combine serverURL with current path
  //console.log("endpoint", endpoint)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Make an Axios call to the backend using the dynamic endpoint
        const response = await axios.get(endpoint);
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error fetching projects data');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [endpoint]); // Dependency includes endpoint, so it updates if the route changes

  if (loading) return <div className="loading-spinner">Loading....</div>; // Show loading spinner
  if (error) return <div>{error}</div>;

  return (
    <div className="project-container">
      {projects.map((project) => (
        <GalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGallery;
