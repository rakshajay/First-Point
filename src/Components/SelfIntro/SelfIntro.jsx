import "./SelfIntro.scss";
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import raksha3D from "../../assets/3DModels/standard_front_view_o_0919011450.glb";
import { MeshBasicMaterial, MeshStandardMaterial} from 'three';


const My3DModel = () => {
  const { scene,nodes, matrial} = useGLTF(raksha3D);
   
   scene.traverse((child) => {
    if (child.isMesh) {
      const wireframeMesh = child.clone();
      child.material = new MeshStandardMaterial({ color: "#8AB9F1" });

      wireframeMesh.material = new MeshBasicMaterial({
        color: 'black',
        wireframe: true,
      });

    
      child.parent.add(wireframeMesh);
    }
  });

  return <primitive object={scene} scale={1.5} />;
};

const SelfIntro = () => {
  return (
    <div className="intro">
      <div className="intro-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <My3DModel />
        </Canvas>
      </div>

      <div className="intro-text" >
        <h2>About Me</h2>
        <p>Hi, I'm Raksha, an architect venturing into tech. My portfolio showcases my diverse passions and projects that blend creativity and technology.</p>
        <div className="intro-text_index">
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

export default SelfIntro;
