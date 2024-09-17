import './ModelUploader.scss';
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Select, GizmoHelper, GizmoViewport, TransformControls, OrbitControls } from '@react-three/drei';
import TextInput from '../TextInput/TextInput';
import * as THREE from 'three';

const ModelUploader = () => {
  const [model, setModel] = useState(null);
  const [secondModel, setSecondModel] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null); // Track the selected model for transformations
  const [mode, setMode] = useState('translate'); // Initial mode: translate, rotate, or scale
  const [isOrbitEnabled, setIsOrbitEnabled] = useState(true); // To enable/disable OrbitControls
  const transformRef = useRef();

  // Function to handle model selection and disable orbit controls
  const handlePointerDown = (event, model) => {
    event.stopPropagation(); // Prevent event from bubbling up to Canvas' onPointerMissed
    if (selectedModel === model) {
      setSelectedModel(null); // Deselect if the same model is clicked
      setIsOrbitEnabled(true); // Re-enable orbit controls
      console.log("Model deselected");
    } else {
      setSelectedModel(model); // Select the clicked model
      setIsOrbitEnabled(false); // Disable orbit controls
      console.log("Model selected", model);
    }
  };

  // Deselect model if click happens anywhere outside the models
  const handlePointerMissed = () => {
    setSelectedModel(null);
    setIsOrbitEnabled(true); // Re-enable orbit controls
    console.log("Clicked outside, model deselected");
  };

  // Function to load the first model
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const loader = new GLTFLoader();
      loader.parse(e.target.result, '', (gltf) => {
        setModel(gltf.scene);
      });
    };

    if (file) {
      reader.readAsArrayBuffer(file); // Read the file as a buffer for parsing
    }
  };

  // Function to load the second model
  const handleSecondFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const loader = new GLTFLoader();
      loader.parse(e.target.result, '', (gltf) => {
        setSecondModel(gltf.scene);
      });
    };

    if (file) {
      reader.readAsArrayBuffer(file); // Read the file as a buffer for parsing
    }
  };

  // Function to re-enable orbit controls when done with transformation
  const handleTransformEnd = () => {
    setIsOrbitEnabled(true); // Re-enable orbit controls
  };

  return (
    <div>
      <input type="file" accept=".glb,.gltf" onChange={handleFileUpload} />
      <input type="file" accept=".glb,.gltf" onChange={handleSecondFileUpload} />
      
      {/* 3D Canvas where the models are displayed */}
      <Canvas
        style={{ width: '100%', height: '600px' }}
        onPointerMissed={handlePointerMissed} // Deselect if click happens outside models
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        {model && (
          <primitive 
            object={model} 
            position={[0, -1, 0]}  
            onPointerDown={(event) => handlePointerDown(event, model)} // Select model on click
          />
        )}
        {secondModel && (
          <primitive 
            object={secondModel} 
            position={[2, -1, 0]} 
            onPointerDown={(event) => handlePointerDown(event, secondModel)} // Select second model on click
          />
        )}

        {/* OrbitControls with dynamic enable/disable */}
        <OrbitControls enabled={isOrbitEnabled} />
        
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
        </GizmoHelper>

        {/* TransformControls applied to the selected model */}
        {selectedModel && (
          <TransformControls
            ref={transformRef}
            object={selectedModel} // Apply transformation to the selected model
            mode={mode} // Mode: translate, rotate, scale
            onMouseUp={handleTransformEnd} // Re-enable orbit controls after transformation
          />
        )}
      </Canvas>

      <div className="controls">
        <button onClick={() => setMode('translate')}>Translate</button>
        <button onClick={() => setMode('rotate')}>Rotate</button>
        <button onClick={() => setMode('scale')}>Scale</button>
      </div>

      <TextInput />
    </div>
  );
};

export default ModelUploader;
