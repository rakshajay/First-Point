import "./SelfIntro.scss";
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import raksha3D from "../../assets/3DModels/standard_front_view_o_0919011450.glb";
import { MeshBasicMaterial, MeshStandardMaterial} from 'three';


const My3DModel = () => {
  const { scene,nodes, matrial} = useGLTF(raksha3D);
   // Traverse the scene and apply both the solid and wireframe materials
   scene.traverse((child) => {
    if (child.isMesh) {
      // Clone the child mesh to have a wireframe version
      const wireframeMesh = child.clone();

      // Apply solid material to the original mesh
      child.material = new MeshStandardMaterial({ color: 'white' });

      // Apply wireframe material to the cloned mesh
      wireframeMesh.material = new MeshBasicMaterial({
        color: 'black',
        wireframe: true,
      });

      // Add the wireframe mesh to the scene as a sibling of the original mesh
      child.parent.add(wireframeMesh);
    }
  });

  return <primitive object={scene} scale={1.5} />;
};

const SelfIntro = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <My3DModel />
        </Canvas>
      </div>

      <div id="text" >
        <h2>About Me</h2>
        <p>Hi, I'm Raksha, an architect and tech enthusiast. My portfolio showcases my diverse passions and projects that blend creativity and technology.</p>
        <div>
          <h1><a href="#architecture">Architecture</a></h1>
          <h1><a href="#ar-vr-xr">AR/VR/XR</a></h1>
          <h1><a href="#cooking">Cooking</a></h1>
          <h1><a href="#painting">Painting</a></h1>
          <h1><a href="#web-design">Web Design/Development</a></h1>
          <h1><a href="#ai-robotics">AI/Robotics</a></h1>
          <h1><a href="#gaming">Gaming</a></h1>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
  },
  leftSection: {
    width: '50%',
    height: '100vh',
  },
  rightSection: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  },
  linksSection: {
    marginTop: '20px',
  },
};

export default SelfIntro;
