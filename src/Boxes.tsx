import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, BufferGeometry, Material, Vector3, Color } from "three";
import { useControls, folder } from "leva";

function Box({ colour }: { colour: [number, number, number] }) {
  const box = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(null);
  const time = useRef(0);
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

  const [position, setPosition] = useState(getPosition());

  const resetPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    );

    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    setPosition(v);
  };

  useFrame((state, delta) => {
    if (box.current) {
      time.current += delta * 1.2;
      const newZ = position.z - time.current;

      if (newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      box.current.position.set(position.x, position.y, newZ);
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
  const { boxesIsVisible } = useControls({
    boxes: folder({
      boxesIsVisible: true,
    }),
  });

  return (
    <group visible={boxesIsVisible}>
      {Array.from({ length: 100 }, (_, index) => (
        <Box
          key={`box-${index}`}
          colour={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </group>
  );
}
