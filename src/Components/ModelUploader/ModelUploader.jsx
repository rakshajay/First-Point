import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, Text, useTexture, Reflector } from "@react-three/drei";
import { Physics, useBox, useSphere } from "@react-three/cannon";
import { useEffect, useRef, useState } from "react";
import hdr from "../../assets/adamsbridge.hdr";
import notsure from "../../assets/3DModels/model (19).glb";
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"

const rfs = THREE.MathUtils.randFloatSpread;
const HPI = Math.PI / 2

const ModelUploader = ({ newModel }) => {

  //console.log("newmodel", newModel);
  const newModelData = useGLTF(
    newModel ||
      "https://assets.meshy.ai/09467c50-ff5c-4d3a-8b3c-b2fb3001f4d1/tasks/01921355-b14a-7a15-bf64-f17cc4c5a9e3/output/model.glb?Expires=4880476800&Signature=oEQCsiDgbxmX3K-983Z~mV7Ef29uh8f1c88zMDrQNk7TEI9NgVl4au2c~B4ceWwbY-VeD75RMsKWe~0BBOENug8-wsbZl2gSj~H2gcpNCC5JIxI~mDELcOBztn9Ul5Z1iaQArS~Ackhb1JjaDfdi~loJ-UCTtgXnWaDn4ifSzZt3ko~jfzpBVUoe-2WsRyh-estzyWY6kh4KGBgn6BawujRDm5rCt6e3CgPhHjLBGTqkkDkux-r5~C2APS7o-QwcytN6z~ObSmSfzk~LYiF1ilt8XWU20gIwICkQm6RcRTxKC-iQgLagDl3~Pc08egBXvsk4D3ShTRlA3d8AeWooCg__&Key-Pair-Id=KL5I0C8H7HX83"
  );
  const { nodes: nodes2, scene: scene2 } = useGLTF(notsure);
  const geometry2 = scene2.children[0].geometry;
  const material2 = new THREE.MeshPhysicalMaterial({ color: 0xffa500 });
  
  const directionalLightRef = useRef(); // Ref for the directional light

 // Runs when the new model is loaded

  function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
    const { nodes, materials, scene } = newModelData;
    //console.log("scene", scene);
    //console.log("nodes", nodes);

    // Define glass material
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

    // Extract the geometry from the new model
    const newModelGeometry = newModelData.scene.children[0].geometry;

    const [ref, api] = useSphere(() => ({
      args: [0.5], // radius of the sphere
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
            vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-20).toArray(),
            [0, 0, 0]
          );
      }
     
      for (let i = 0; i < 20; i++) {
        ref2.current.getMatrixAt(i, mat);
        api2.at(i).applyForce(
          vec.setFromMatrixPosition(mat).normalize().multiplyScalar(-20).toArray(),
          [0, 0, 0]
        );
      }
      // Rotate the new model's scene
      newModelData.scene.rotation.y += 0.01;
      scene2.rotation.y += 1;
    });

    return (
      <><instancedMesh
        ref={ref}
        castShadow
        receiveShadow
        args={[newModelGeometry, null, 20]}
        scale={[1.2, 1.2, 1.2]}
      >
        <primitive attach="material" object={glassMaterial} />
      </instancedMesh>

      {/* Instanced mesh for object 2 */}
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
      position: [0, -6, 0],
      args: [10, 1, 10],
    }));

    return (
      <mesh ref={ref} receiveShadow mirror={2}>
        <boxGeometry args={[40, 1, 10]} resolution={512} mirror={200} mixBlur={2} mixStrength={0.8}/>
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
        shadows={true}
        fog={{ color: 'white', near: 1000, far: 5 }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 100 }}
      >
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#000000"]} />

        {/* Directional Light */}
        <directionalLight
          ref={directionalLightRef} // Assign ref to directional light
          intensity={1}
          position={[1, 10, -6]}
          castShadow
        />
        <Physics gravity={[0, 1, 0]}  iterations={10} substeps={2}>
          <Pointer />
          <Clump />
          <Floor />
        </Physics>

        <Environment files={hdr} />
        <EffectComposer disableNormalPass multisampling={0}>
      <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
      <SMAA />
    </EffectComposer>
      </Canvas>
    </>
  );
};

export default ModelUploader;
