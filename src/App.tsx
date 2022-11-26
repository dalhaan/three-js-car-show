import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls, folder } from "leva";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { Boxes } from "./Boxes";
import { Vector2 } from "three";
import { FloatingGrid } from "./FloatingGrid";

function CarShow() {
  const {
    bloomIntensity,
    bloomSize,
    bloomKernelSize,
    bloomLuminanceThreshold,
    chromaticAberrationOffsetX,
    chromaticAberrationOffsetY,
  } = useControls({
    effects: folder({
      bloom: folder({
        bloomIntensity: {
          label: "intensity",
          value: 1.3,
          min: 0,
          max: 5,
          step: 0.01,
        },
        bloomSize: {
          label: "size",
          value: 300,
          min: 0,
          max: 500,
          step: 1,
        },
        bloomKernelSize: {
          label: "kernel size",
          value: 5,
          min: 0,
          max: 5,
          step: 1,
        },
        bloomLuminanceThreshold: {
          label: "luminance threshold",
          value: 0.15,
          min: 0,
          max: 1,
          step: 0.01,
        },
      }),
      chromaticAberration: folder({
        chromaticAberrationOffsetX: {
          label: "x offset",
          value: 0.0005,
          min: 0,
          max: 1,
          step: 0.00001,
        },
        chromaticAberrationOffsetY: {
          label: "y offset",
          value: 0.0012,
          min: 0,
          max: 1,
          step: 0.00001,
        },
      }),
    }),
  });

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* Set background colour */}
      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <Rings />
      <Boxes />
      <FloatingGrid />

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

      {/* Post processing */}
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={bloomIntensity}
          width={bloomSize}
          height={bloomSize}
          kernelSize={bloomKernelSize}
          luminanceThreshold={bloomLuminanceThreshold}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={
            new Vector2(chromaticAberrationOffsetX, chromaticAberrationOffsetY)
          }
        />
      </EffectComposer>
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
