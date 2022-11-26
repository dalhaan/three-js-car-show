import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader, Vector2 } from "three";

export function Ground() {
  const [normalMap, roughnessMap] = useLoader(TextureLoader, [
    "textures/terrain-normal.jpg",
    "textures/terrain-roughness.jpg",
  ]);

  // Configure textures
  useEffect(() => {
    [normalMap, roughnessMap].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 5);
    });

    normalMap.encoding = LinearEncoding;
  }, [normalMap, roughnessMap]);

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        normalMap={normalMap}
        normalScale={new Vector2(0.15, 0.15)}
        roughnessMap={roughnessMap}
        envMapIntensity={0}
        dithering
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}
