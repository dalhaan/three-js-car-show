import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useControls, folder } from "leva";

function CarShow() {
  const { r, g, b } = useControls({
    cubeColor: folder({
      r: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.05,
      },
      g: {
        value: 0,
        min: 0,
        max: 1,
        step: 0.05,
      },
      b: {
        value: 0,
        min: 0,
        max: 1,
        step: 0.05,
      },
    }),
  });

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Set background colour */}
      <color args={[0, 0, 0]} attach="background" />

      {/* Lighting */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={[r, g, b]} />
      </mesh>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
