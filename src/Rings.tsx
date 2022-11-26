import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  BufferGeometry,
  Color,
  Material,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { useControls, folder } from "leva";

type MeshType = Mesh<BufferGeometry, Material | Material[]> | null;

export function Rings() {
  const {
    noRings,
    ringsScaleFalloff,
    ringsIntensityFalloff,
    ringsIntensityMul,
    ringsIsVisible,
  } = useControls({
    rings: folder({
      ringsIsVisible: {
        label: "visible",
        value: true,
      },
      noRings: {
        label: "count",
        value: 14,
      },
      ringsScaleFalloff: {
        label: "Scale falloff",
        value: 0.04,
        min: 0,
        max: 0.1,
        step: 0.01,
      },
      ringsIntensityFalloff: {
        label: "Intensity falloff",
        value: 10,
        min: 0,
        max: 50,
        step: 0.1,
      },
      ringsIntensityMul: {
        label: "Intensity Mul",
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
      },
    }),
  });

  const itemsRef = useRef<MeshType[]>([]);

  useFrame((state) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      const mesh = itemsRef.current[i];

      if (mesh) {
        // Update rings position
        // const z = (i - noRings / 2) * 3.5;
        const z = (i - noRings / 2) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
        mesh.position.set(0, 0, -z);

        // Update ring scale falloff
        const dist = Math.abs(z);
        mesh.scale.set(
          1 - dist * ringsScaleFalloff,
          1 - dist * ringsScaleFalloff,
          1 - dist * ringsScaleFalloff
        );

        // Set ring colours
        if (mesh.material instanceof MeshStandardMaterial) {
          // Colour falloff
          let colourScale = 1;
          if (dist > 2) {
            colourScale =
              1 -
              (Math.min(dist, ringsIntensityFalloff + 2) - 2) /
                ringsIntensityFalloff;
          }
          colourScale *= ringsIntensityMul;

          if (i % 2 === 1) {
            mesh.material.emissive = new Color(6, 0.15, 0.7).multiplyScalar(
              colourScale
            );
          } else {
            mesh.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(
              colourScale
            );
          }
        }
      }
    }
  });

  return (
    <group visible={ringsIsVisible}>
      {Array.from({ length: noRings }, (_, index) => (
        <mesh
          key={`ring-${index}`}
          ref={(el) => (itemsRef.current[index] = el)}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
        </mesh>
      ))}
    </group>
  );
}
