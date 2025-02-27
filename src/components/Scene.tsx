import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create world map points
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
    //constellation
    const worldMapMaterial = new THREE.PointsMaterial({
      size: 0.0,
      color: 0xffffff
    });

    const worldMap = new THREE.Points(worldMapGeometry, worldMapMaterial);
    scene.add(worldMap);

    // Create targeting rays
    const rayMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00000,
      transparent: true,
      opacity: 0
    });

    const rays: THREE.Line[] = [];
    const maxRays = 5;

    const createRay = () => {
      const rayGeometry = new THREE.BufferGeometry();
      const startPoint = new THREE.Vector3(0, -2, 0); // Plant position
      const endPoint = worldMapPoints[Math.floor(Math.random() * worldMapPoints.length)];
      
      const points = [startPoint, endPoint];
      rayGeometry.setFromPoints(points);

      const ray = new THREE.Line(rayGeometry, rayMaterial);
      scene.add(ray);
      rays.push(ray);

      // Remove ray after animation
      setTimeout(() => {
        scene.remove(ray);
        rays.splice(rays.indexOf(ray), 1);
      }, 2000);
    };


    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Add new rays randomly
      if (rays.length < maxRays && Math.random() > 0.95) {
        createRay();
      }

      // Animer les rayons
      rays.forEach(ray => {
        // Vérifie si ray.material est un tableau de matériaux ou un seul matériau
        const material = Array.isArray(ray.material) ? ray.material[0] : ray.material;
        if (material) {
          material.opacity = (material.opacity || 0.6) * 0.99;
        }
      });

      // Rotate world map
      worldMap.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
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

  return <canvas ref={canvasRef} />;
};

export default Scene;