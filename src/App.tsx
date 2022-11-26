import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { useControls } from "leva";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Set background colour */}
      <color args={[0, 0, 0]} attach="background" />

      <Car />
      <Rings />

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

      <Ground />
    </>
  );
}

function App() {
  const { showStats } = useControls({
    showStats: true,
  });

  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
        {showStats ? <Stats /> : null}
      </Canvas>
    </Suspense>
  );
}

export default App;
