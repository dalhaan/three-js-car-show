import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, Material, Mesh } from "three";
import { useControls } from "leva";

type MeshType = Mesh<BufferGeometry, Material | Material[]> | null;

export function Rings() {
  const { noRings } = useControls({
    noRings: 14,
  });

  const itemsRef = useRef<MeshType[]>([]);

  useFrame(() => {
    for (let i = 0; i < itemsRef.current.length; i++) {
      const mesh = itemsRef.current[i];

      if (mesh) {
        const z = (i - noRings / 2) * 3.5;
        mesh.position.set(0, 0, -z);
      }
    }
  });

  return (
    <>
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
    </>
  );
}
