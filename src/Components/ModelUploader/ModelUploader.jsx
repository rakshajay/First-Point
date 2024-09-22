import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Reflector } from "@react-three/drei";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { useEffect, useRef, useState } from "react";
import hdr from "../../assets/adamsbridge.hdr";
import giraffe from "../../assets/3DModels/model (19).glb";
import bike from "../../assets/3DModels/bike.glb";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing";

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

  function Clump({
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
      for (let i = 0; i < 20; i++) {
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
          args={[geometry, null, 20]}
          scale={[1, 1, 1]}
        >
          <primitive attach="material" object={glassMaterial} />
        </instancedMesh>
        <instancedMesh
          ref={ref2}
          castShadow
          receiveShadow
          args={[geometry2, null, 20]} // Use geometry for object 2
          scale={[1, 1, 1]} // Scale up on hover
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
      args: [10, 1, 10],
    }));

    return (
      <mesh ref={ref} receiveShadow>
        <boxGeometry args={[40, 3, 0]} />
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
    <>
      <Canvas
        shadows
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 35, near: 1, far: 100 }}
      >
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#000000"]} />
        <directionalLight intensity={1} position={[1, 10, -6]} castShadow />
        <Physics gravity={[0, 1, 0]} iterations={10} substeps={2}>
          <Pointer />
          {models.map((modelData, index) => (
            <Clump key={index} modelData={modelData} />
          ))}
          <Floor />
        </Physics>
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
    </>
  );
};

export default ModelUploader;
