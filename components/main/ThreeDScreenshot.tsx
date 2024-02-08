// components/ThreeDScreenshot.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ThreeDScreenshot = ({
  screenshotUrl,
  description = "Basic HTML page for Fifth Tribe's Hackathon. My very", // Default description
}: {
  screenshotUrl: string;
  description?: string;
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (!mount) return;

    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(8, 8, 0.1);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      screenshotUrl,
      () => {},
      undefined,
      () => {
        console.error("Failed to load screenshot texture.");
      },
    );
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      if (isFlipped && cube.rotation.y < Math.PI / 2) {
        cube.rotation.y += 0.05;
        if (cube.rotation.y >= Math.PI / 2) {
          cube.rotation.y = Math.PI / 2;
          setShowDescription(true);
        }
      } else if (!isFlipped && cube.rotation.y > 0) {
        setShowDescription(false);
        cube.rotation.y -= 0.05;
        if (cube.rotation.y <= 0) cube.rotation.y = 0;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Event listener for the flip toggle
    const toggleFlip = () => {
      setIsFlipped(!isFlipped);
    };

    mount.addEventListener("click", toggleFlip);

    return () => {
      mount.removeEventListener("click", toggleFlip);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [screenshotUrl, isFlipped]);

  return (
    <div>
      <div
        ref={mountRef}
        style={{ width: "100%", height: "100vh", cursor: "pointer" }}
      />
      {showDescription && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default ThreeDScreenshot;
