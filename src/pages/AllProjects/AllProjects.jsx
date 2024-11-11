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
          // shd add other sections
        ]);
       console.log("architectureRes",architectureRes )
       console.log("webdevRes",webdevRes )
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

  if (loading) return <div className="loading-container"></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="allprojects-container">
      {projects.map((project) => (
        <GalleryCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default AllProjects;
