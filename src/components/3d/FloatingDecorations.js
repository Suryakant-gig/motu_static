import * as THREE from 'three';

/**
 * Creates floating 3D pastel flowers, fluffy clouds, and heart particles
 */
export class FloatingDecorations {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.flowers = [];
    this.hearts = [];

    this.createClouds();
    this.createFlowers();
    this.createHeartParticles();
  }

  createClouds() {
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xfff9fc,
      roughness: 0.8,
      transparent: true,
      opacity: 0.88,
    });

    const cloudPositions = [
      { x: -3.8, y: 2.8, z: -2.5, scale: 0.8 },
      { x: 3.6, y: 2.2, z: -2.2, scale: 0.75 },
      { x: -2.5, y: -0.8, z: -1.8, scale: 0.65 },
      { x: 3.2, y: -0.9, z: -1.9, scale: 0.7 },
    ];

    cloudPositions.forEach((pos, idx) => {
      const cloudGroup = new THREE.Group();
      // Combine multiple overlapping spheres to form a fluffy cloud
      const sphereOffsets = [
        { x: 0, y: 0, z: 0, r: 0.45 },
        { x: 0.35, y: -0.05, z: 0.05, r: 0.35 },
        { x: -0.35, y: -0.06, z: -0.05, r: 0.35 },
        { x: 0.15, y: 0.2, z: 0, r: 0.3 },
      ];

      sphereOffsets.forEach((s) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(s.r, 16, 14), cloudMat);
        mesh.position.set(s.x, s.y, s.z);
        cloudGroup.add(mesh);
      });

      cloudGroup.position.set(pos.x, pos.y, pos.z);
      cloudGroup.scale.setScalar(pos.scale);
      cloudGroup.userData = {
        baseX: pos.x,
        baseY: pos.y,
        speed: 0.2 + idx * 0.08,
        floatOffset: idx * 1.5,
      };

      this.scene.add(cloudGroup);
      this.clouds.push(cloudGroup);
    });
  }

  createFlowers() {
    const flowerMatPink = new THREE.MeshStandardMaterial({
      color: 0xfcb4cc,
      roughness: 0.4,
    });
    const flowerMatLavender = new THREE.MeshStandardMaterial({
      color: 0xd9caff,
      roughness: 0.4,
    });
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0xffe494,
      roughness: 0.3,
    });

    const flowerPositions = [
      { x: -2.6, y: 1.6, z: 0.2, mat: flowerMatPink, scale: 0.25 },
      { x: 2.7, y: 1.4, z: 0.1, mat: flowerMatLavender, scale: 0.22 },
      { x: -2.1, y: -1.2, z: 0.5, mat: flowerMatLavender, scale: 0.24 },
      { x: 2.3, y: -1.1, z: 0.6, mat: flowerMatPink, scale: 0.26 },
      { x: 0.0, y: 2.8, z: -0.5, mat: flowerMatPink, scale: 0.2 },
    ];

    flowerPositions.forEach((fp, idx) => {
      const flowerGroup = new THREE.Group();

      // Yellow center
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), centerMat);
      flowerGroup.add(center);

      // 5 Rounded petals
      const petalGeom = new THREE.SphereGeometry(0.25, 14, 12);
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const petal = new THREE.Mesh(petalGeom, fp.mat);
        petal.scale.set(0.65, 1, 0.3);
        petal.position.set(Math.cos(angle) * 0.38, Math.sin(angle) * 0.38, 0);
        petal.rotation.z = angle;
        flowerGroup.add(petal);
      }

      flowerGroup.position.set(fp.x, fp.y, fp.z);
      flowerGroup.scale.setScalar(fp.scale);
      flowerGroup.userData = {
        baseY: fp.y,
        rotationSpeed: 0.3 + idx * 0.1,
        bobSpeed: 1.2 + idx * 0.3,
        offset: idx * 2.0,
      };

      this.scene.add(flowerGroup);
      this.flowers.push(flowerGroup);
    });
  }

  createHeartParticles() {
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xff7096,
      roughness: 0.3,
      emissive: 0xff3b6f,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.8,
    });

    // Simple 3D heart made of two spheres and a cone
    const createMiniHeart = () => {
      const hGroup = new THREE.Group();
      const sphereGeom = new THREE.SphereGeometry(0.12, 12, 10);
      const s1 = new THREE.Mesh(sphereGeom, heartMat);
      s1.position.set(-0.08, 0.08, 0);
      hGroup.add(s1);

      const s2 = new THREE.Mesh(sphereGeom, heartMat);
      s2.position.set(0.08, 0.08, 0);
      hGroup.add(s2);

      const coneGeom = new THREE.ConeGeometry(0.18, 0.28, 12);
      const cone = new THREE.Mesh(coneGeom, heartMat);
      cone.rotation.z = Math.PI;
      cone.position.set(0, -0.06, 0);
      hGroup.add(cone);

      return hGroup;
    };

    // 14 gentle floating background hearts
    for (let i = 0; i < 14; i++) {
      const heart = createMiniHeart();
      const x = (Math.random() - 0.5) * 6.5;
      const y = (Math.random() - 0.5) * 4.5;
      const z = (Math.random() - 0.5) * 3 - 0.5;

      heart.position.set(x, y, z);
      const scale = 0.5 + Math.random() * 0.6;
      heart.scale.setScalar(scale);

      heart.userData = {
        baseX: x,
        baseY: y,
        speedY: 0.3 + Math.random() * 0.4,
        wobbleSpeed: 1 + Math.random() * 2,
        rotSpeed: (Math.random() - 0.5) * 1.5,
      };

      this.scene.add(heart);
      this.hearts.push(heart);
    }
  }

  update(delta, time) {
    // Drifting clouds
    this.clouds.forEach((cloud) => {
      cloud.position.x = cloud.userData.baseX + Math.sin(time * 0.3 + cloud.userData.floatOffset) * 0.35;
      cloud.position.y = cloud.userData.baseY + Math.cos(time * 0.4 + cloud.userData.floatOffset) * 0.12;
    });

    // Rotating and bobbing flowers
    this.flowers.forEach((flower) => {
      flower.rotation.z += delta * flower.userData.rotationSpeed;
      flower.position.y = flower.userData.baseY + Math.sin(time * flower.userData.bobSpeed + flower.userData.offset) * 0.12;
    });

    // Rising gentle floating hearts
    this.hearts.forEach((heart) => {
      heart.position.y += delta * heart.userData.speedY;
      heart.position.x = heart.userData.baseX + Math.sin(time * heart.userData.wobbleSpeed) * 0.2;
      heart.rotation.z += delta * heart.userData.rotSpeed;

      // Wrap around screen bounds
      if (heart.position.y > 3.2) {
        heart.position.y = -2.8;
      }
    });
  }
}

