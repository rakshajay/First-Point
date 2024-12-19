import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GalleryCard from '../../Components/GalleryCard/GalleryCard';
import "./AllProjects.scss";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const [architectureRes, webdevRes] = await Promise.all([
          axios.get("https://portfolio-backend-sa3o.onrender.com/architecture"),
          axios.get("https://portfolio-backend-sa3o.onrender.com/webdev"),
          axios.get("https://portfolio-backend-sa3o.onrender.com/ar"),
          // shd add other sections
        ]);

        const allProjects = [
          ...architectureRes.data,
          ...webdevRes.data,
          // shd add other sections
        ];

        setProjects(allProjects);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error fetching all projects data');
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  if (loading) return <div className="loading-container">Loading</div>;
  if (error) return <div>{error}error</div>;

  return (
    <div className="allprojects-container">
      {projects.map((project) => (
        <GalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default AllProjects;
