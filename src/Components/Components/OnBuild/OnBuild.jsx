import React from 'react';
import CatLoading from '../../assets/Readme/CatLoading.jpg'; 

const OnBuild = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20%' }}>
      <img 
        src={CatLoading} 
        alt="Loading cat" 
        style={{ width: '250px', height: 'auto', marginBottom: '10px' }} 
      />
      <p>Building the backend...Very soon it will be updated here</p>
    </div>
  );
};

export default OnBuild;
