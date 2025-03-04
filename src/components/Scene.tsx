import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00000f);

    const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const worldMapPoints: THREE.Vector3[] = [];
    const worldMapGeometry = new THREE.BufferGeometry();
    const worldMapVertices = new Float32Array(10000 * 3);

    for (let i = 0; i < 10000; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360) * Math.PI / 180;
      const phi = THREE.MathUtils.randFloatSpread(180) * Math.PI / 180;

      const x = 4 * Math.cos(phi) * Math.cos(theta);
      const y = 4 * Math.cos(phi) * Math.sin(theta);
      const z = 4 * Math.sin(phi);

      worldMapVertices[i * 3] = x;
      worldMapVertices[i * 3 + 1] = y;
      worldMapVertices[i * 3 + 2] = z;

      worldMapPoints.push(new THREE.Vector3(x, y, z));
    }

    worldMapGeometry.setAttribute('position', new THREE.BufferAttribute(worldMapVertices, 3));

    const worldMapMaterial = new THREE.PointsMaterial({
      size: 0.0,
      color: 0xffffff
    });

    const worldMap = new THREE.Points(worldMapGeometry, worldMapMaterial);
    scene.add(worldMap);

    const animate = () => {
      requestAnimationFrame(animate);

      worldMap.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default Scene;