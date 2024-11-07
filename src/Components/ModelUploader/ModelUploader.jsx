import "./ModelUploader.scss";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Reflector,
  Text,
} from "@react-three/drei";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import React, { useEffect, useRef, useState } from "react";
import hdr from "../../assets/hdr/adamsbridge.hdr";
import giraffe from "../../assets/3DModels/model (19).glb";
import bike from "../../assets/3DModels/bike.glb";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";
import { Link } from "react-router-dom";

const rfs = THREE.MathUtils.randFloatSpread;

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x87ccee,
  metalness: 1.6,
  roughness: 0.05,
  transmission: 1,
  thickness: 1,
  clearcoat: 1,
  clearcoatRoughness: 0,
  opacity: 0.5,
  transparent: true,
  ior: 1.5,
});

const ModelUploader = ({ newModel }) => {
  const [models, setModels] = useState([]);
  //console.log("newModel", newModel)
  const directionalLightRef = useRef();

  // Load the giraffe model initially
  const { nodes: nodes2, scene: scene2 } = useGLTF(giraffe);
  const geometry2 = scene2.children[0].geometry;
  const material2 = new THREE.MeshPhysicalMaterial({ color: 0xffa500 });

  let newModelData;
  if (newModel) {
    newModelData = useGLTF(newModel);
  }

  useEffect(() => {
    if (newModel && newModelData) {
      setModels((prevModels) => [...prevModels, newModelData]);
    }
  }, [newModel, newModelData]);
  const bikeModel = useGLTF(bike);
  useEffect(() => {
    setModels([bikeModel]);
  }, [bikeModel]);

  function ArtCollection({
    modelData,
    mat = new THREE.Matrix4(),
    vec = new THREE.Vector3(),
  }) {
    const geometry = modelData.scene.children[0].geometry;

    const [ref, api] = useSphere(() => ({
      args: [0.8],
      mass: 1,
      angularDamping: 0.1,
      linearDamping: 0.65,
      position: [rfs(20), rfs(20), rfs(20)],
    }));
    const [ref2, api2] = useBox(() => ({
      args: [1, 1, 1],
      mass: 1,
      angularDamping: 0.1,
      linearDamping: 0.65,
      position: [rfs(20), rfs(20), rfs(20)],
    }));

    useFrame(() => {
      for (let i = 0; i < 40; i++) {
        ref.current.getMatrixAt(i, mat);
        api
          .at(i)
          .applyForce(
            vec
              .setFromMatrixPosition(mat)
              .normalize()
              .multiplyScalar(-20)
              .toArray(),
            [0, 0, 0]
          );
      }
      for (let i = 0; i < 20; i++) {
        ref2.current.getMatrixAt(i, mat);
        api2
          .at(i)
          .applyForce(
            vec
              .setFromMatrixPosition(mat)
              .normalize()
              .multiplyScalar(-20)
              .toArray(),
            [0, 0, 0]
          );
      }
    });

    return (
      <>
        <instancedMesh
          ref={ref}
          castShadow
          receiveShadow
          args={[geometry, null, 40]}
          scale={[1, 1, 1]}
          position={[0, 0, 0]}
        >
          <primitive attach="material" object={glassMaterial} />
        </instancedMesh>
        <instancedMesh
          ref={ref2}
          castShadow
          receiveShadow
          args={[geometry2, null, 20]} // Use geometry for object 2
          scale={[1, 1, 1]} // Scale up on hover
          position={[0, 0, 0]}
        >
          <primitive attach="material" object={material2} />
        </instancedMesh>
      </>
    );
  }

  function Floor() {
    const [ref] = useBox(() => ({
      type: "Static",
      mass: 1,
      position: [0, 0, 0],
      args: [40, 2, 10],
    }));

    return (
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[280, 3, 0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>
    );
  }

  function Pointer() {
    const viewport = useThree((state) => state.viewport);
    const [, api] = useBox(() => ({
      type: "Kinematic",
      args: [1, 1, 1],
      position: [0, 0, 0],
    }));
    return useFrame((state) =>
      api.position.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        0
      )
    );
  }

  return (
    <div className="canvas">
      <Canvas
        shadows={true}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 10, 25], fov: 35, near: 1, far: 100 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          ref={directionalLightRef} // Assign ref to directional light
          intensity={1}
          position={[1, 10, -6]}
          castShadow
        />
        <Physics gravity={[0, 1, 0]} iterations={10} substeps={2}>
          <Pointer />
          {models.map((modelData, index) => (
            <ArtCollection key={index} modelData={modelData} />
          ))}
          <Floor />
        </Physics>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 8}
        />

        <Environment files={hdr} />
        <EffectComposer disableNormalPass multisampling={0}>
          <N8AO
            halfRes
            color="black"
            aoRadius={2}
            intensity={1}
            aoSamples={6}
            denoiseSamples={4}
          />
          <SMAA />
        </EffectComposer>
      </Canvas>
      <div className="canvas-index">
        <div>
          <Link to="/intro">
            <h1>ME</h1>
          </Link>
          <Link to="/resume">
            <p>Resume</p>
          </Link>
        </div>
        <div className="canvas-index_projects">
          <h4>PROJECTS</h4>
          <div className="canvas-index_projects-sec">
            <div className="canvas-index_projects-sec-row">
              <Link to="/architecture">
                <p>Architecture</p>
              </Link>
              <p>AR/VR/XR</p>
              <p>Paintings</p>
            </div>
            <div className="canvas-index_projects-sec-row">
              <p>Wed dev</p>
              <p>AI/Robotics</p>
              <p>Cooking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUploader;
