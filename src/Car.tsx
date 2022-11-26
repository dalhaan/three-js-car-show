import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls, folder } from "leva";

export function Car() {
  const { carIsVisible } = useControls({
    car: folder({
      carIsVisible: {
        label: "visible",
        value: true,
      },
    }),
  });

  const gltf = useLoader(GLTFLoader, "models/car/scene.gltf");

  // Configure GLTF model for scene
  useEffect(() => {
    gltf.scene.visible = carIsVisible;
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  // Update car visibility
  useEffect(() => {
    gltf.scene.visible = carIsVisible;
  }, [gltf, carIsVisible]);

  // Animate
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 1.8;

    const group = gltf.scene.children[0].children[0].children[0];
    group.children[0].rotation.x = t;
    group.children[2].rotation.x = t;
    group.children[4].rotation.x = t;
    group.children[6].rotation.x = t;
  });

  return <primitive object={gltf.scene} />;
}
