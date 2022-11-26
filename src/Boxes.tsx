import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, BufferGeometry, Material, Vector3, Color } from "three";

function Box({ colour }: { colour: [number, number, number] }) {
  const box = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(null);
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  const getPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );

    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    return v;
  };

  const [position] = useState(getPosition());

  useFrame((state, delta) => {
    if (box.current) {
      box.current.position.set(position.x, position.y, position.z);
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    }
  });

  return (
    <mesh ref={box} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={colour} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Boxes() {
  return (
    <>
      {Array.from({ length: 100 }, (_, index) => (
        <Box
          key={`box-${index}`}
          colour={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
}
