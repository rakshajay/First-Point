import "./SelfIntro.scss";
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import raksha3D from "../../assets/3DModels/standard_front_view_o_0919011450.glb";
import { MeshBasicMaterial, MeshStandardMaterial} from 'three';
import { Link } from "react-router-dom";


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

  return <primitive object={scene} scale={1.5}/>;
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
        <h3>About Me</h3>
        <p>Hi, I’m Raksha Shetty, an architect turned tech enthusiast with a passion for blending design, coding, and immersive experiences. With a Master’s in Architectural Technologies, I explore the intersection of AI, AR/VR, and digital art to create innovative, interactive environments. From designing spaces to building dynamic 3D experiences, I’m always excited about pushing the boundaries of what’s possible through technology.</p>
        <p>gmail: rakshashettyhs@gmail.com</p>
        <p>LinkedIn: https://www.linkedin.com/in/Rakshajay/</p>
        <p>GitHub: https://github.com/rakshajay</p>
        <p>Resume: https://www.rakshashetty.com/resume</p>
        <div className="intro-text_index">
        <Link  to="/architecture"><h3>Architecture</h3></Link>
        <Link  to="/OnBuild"><h3>AR/VR/XR</h3></Link>
        <Link  to="/OnBuild"><h3>Cooking</h3></Link>
        <Link  to="/OnBuild"><h3>Painting</h3></Link>
        <Link  to="/webdev"><h3>Web Design/Development</h3></Link>
        <Link  to="/OnBuild"><h3>AI/Robotics</h3></Link>
        <Link  to="/OnBuild"><h3>Gaming</h3></Link>
        </div>
    </div>
    </div>
  );
};

export default SelfIntro;
