import * as THREE from 'three';

/**
 * Creates a stylized Kawaii 3D Panda character.
 * Uses Three.js primitives with soft materials for 60fps performance and zero external model dependencies.
 */
export class PandaCharacter {
  constructor({ isRight = false, name = 'Bao' } = {}) {
    this.isRight = isRight;
    this.name = name;
    this.group = new THREE.Group();

    // Animation states
    this.blinkTimer = Math.random() * 2 + 1;
    this.isBlinking = false;
    this.blinkProgress = 0;
    this.earWiggleTimer = Math.random() * 3 + 2;
    this.isWaving = false;
    this.waveTime = 0;
    this.holdingItem = 'none'; // 'none', 'heart', 'coffee', 'chai', 'hands'

    // Materials
    this.initMaterials();

    // Build the panda parts
    this.buildBody();
    this.buildHead();
    this.buildLimbs();
    this.buildAccessories();

    // Scale and position adjustment
    this.group.scale.set(1, 1, 1);
  }

  initMaterials() {
    // Soft creamy white for fur
    this.whiteFurMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.65,
      metalness: 0.05,
    });

    // Velvety dark charcoal for patches & limbs
    this.blackFurMat = new THREE.MeshStandardMaterial({
      color: 0x242026,
      roughness: 0.75,
      metalness: 0.05,
    });

    // Soft blush pink for cheeks and inner ears
    this.blushMat = new THREE.MeshBasicMaterial({
      color: 0xffa0bc,
      transparent: true,
      opacity: 0.85,
    });

    // Cute pastel pink for paw pads
    this.pawPadMat = new THREE.MeshStandardMaterial({
      color: 0xf5a3be,
      roughness: 0.5,
    });

    // Glossy eyes
    this.eyeMat = new THREE.MeshBasicMaterial({
      color: 0x111115,
    });

    this.eyeCatchlightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Shiny pink heart material
    this.heartMat = new THREE.MeshStandardMaterial({
      color: 0xff537a,
      roughness: 0.25,
      metalness: 0.1,
      emissive: 0xff2a55,
      emissiveIntensity: 0.2,
    });

    // Mug material
    this.cupMat = new THREE.MeshStandardMaterial({
      color: 0xfff0f5,
      roughness: 0.3,
    });

    // Coffee foam / Chai
    this.coffeeMat = new THREE.MeshStandardMaterial({
      color: 0x6f4e37,
      roughness: 0.4,
    });
    this.chaiMat = new THREE.MeshStandardMaterial({
      color: 0xc68b59,
      roughness: 0.4,
    });
  }

  buildBody() {
    this.bodyGroup = new THREE.Group();

    // Chubby pear-shaped body
    const bodyGeom = new THREE.SphereGeometry(0.72, 32, 24);
    this.bodyMesh = new THREE.Mesh(bodyGeom, this.whiteFurMat);
    this.bodyMesh.scale.set(1.05, 1.15, 0.95);
    this.bodyMesh.position.y = 0.65;
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.bodyGroup.add(this.bodyMesh);

    // Cute black chest collar / vest pattern (distinctive panda marking)
    const collarGeom = new THREE.CylinderGeometry(0.74, 0.76, 0.35, 32);
    const collarMesh = new THREE.Mesh(collarGeom, this.blackFurMat);
    collarMesh.position.y = 0.95;
    collarMesh.scale.set(1.02, 1, 0.95);
    this.bodyGroup.add(collarMesh);

    // Cute tiny tail on the back
    const tailGeom = new THREE.SphereGeometry(0.14, 16, 16);
    const tailMesh = new THREE.Mesh(tailGeom, this.blackFurMat);
    tailMesh.position.set(0, 0.45, -0.68);
    this.bodyGroup.add(tailMesh);

    this.group.add(this.bodyGroup);
  }

  buildHead() {
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 1.48, 0.05);

    // Kawaii head: slightly flattened sphere
    const headGeom = new THREE.SphereGeometry(0.82, 32, 24);
    const headMesh = new THREE.Mesh(headGeom, this.whiteFurMat);
    headMesh.scale.set(1.12, 0.96, 1.02);
    headMesh.castShadow = true;
    this.headGroup.add(headMesh);

    // Snout
    const snoutGeom = new THREE.SphereGeometry(0.32, 24, 18);
    const snoutMesh = new THREE.Mesh(snoutGeom, this.whiteFurMat);
    snoutMesh.scale.set(1.1, 0.85, 1);
    snoutMesh.position.set(0, -0.12, 0.68);
    this.headGroup.add(snoutMesh);

    // Cute black nose
    const noseGeom = new THREE.SphereGeometry(0.11, 16, 16);
    const noseMesh = new THREE.Mesh(noseGeom, this.blackFurMat);
    noseMesh.scale.set(1.2, 0.85, 0.9);
    noseMesh.position.set(0, -0.05, 0.96);
    this.headGroup.add(noseMesh);

    // Rosy blushing cheeks
    const cheekGeom = new THREE.CircleGeometry(0.18, 20);
    const leftCheek = new THREE.Mesh(cheekGeom, this.blushMat);
    leftCheek.position.set(-0.46, -0.16, 0.72);
    leftCheek.rotation.y = -0.45;
    this.headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeom, this.blushMat);
    rightCheek.position.set(0.46, -0.16, 0.72);
    rightCheek.rotation.y = 0.45;
    this.headGroup.add(rightCheek);

    // Eye Patches & Glossy Kawaii Eyes
    this.eyeGroup = new THREE.Group();
    this.buildEyes();
    this.headGroup.add(this.eyeGroup);

    // Ears
    this.leftEar = this.createEar(false);
    this.leftEar.position.set(-0.65, 0.68, -0.05);
    this.leftEar.rotation.z = 0.4;
    this.headGroup.add(this.leftEar);

    this.rightEar = this.createEar(true);
    this.rightEar.position.set(0.65, 0.68, -0.05);
    this.rightEar.rotation.z = -0.4;
    this.headGroup.add(this.rightEar);

    this.group.add(this.headGroup);
  }

  createEar(isRight) {
    const earGroup = new THREE.Group();

    // Outer ear
    const earGeom = new THREE.SphereGeometry(0.3, 24, 20);
    const earMesh = new THREE.Mesh(earGeom, this.blackFurMat);
    earMesh.scale.set(1, 1.15, 0.65);
    earGroup.add(earMesh);

    // Inner ear pink touch
    const innerGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const innerMesh = new THREE.Mesh(innerGeom, this.pawPadMat);
    innerMesh.scale.set(0.9, 1, 0.3);
    innerMesh.position.set(0, 0, 0.12);
    earGroup.add(innerMesh);

    return earGroup;
  }

  buildEyes() {
    // Left eye patch
    const patchGeom = new THREE.SphereGeometry(0.24, 20, 16);
    
    // Left patch
    const leftPatch = new THREE.Mesh(patchGeom, this.blackFurMat);
    leftPatch.scale.set(0.9, 1.25, 0.35);
    leftPatch.position.set(-0.35, 0.05, 0.7);
    leftPatch.rotation.set(0.1, 0.15, -0.25);
    this.eyeGroup.add(leftPatch);

    // Left Pupil
    this.leftPupil = new THREE.Group();
    this.leftPupil.position.set(-0.33, 0.06, 0.78);

    const pupilGeom = new THREE.SphereGeometry(0.09, 16, 16);
    const pupilMesh = new THREE.Mesh(pupilGeom, this.eyeMat);
    this.leftPupil.add(pupilMesh);

    // Sparkle catchlights
    const catchlight1 = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), this.eyeCatchlightMat);
    catchlight1.position.set(0.025, 0.03, 0.075);
    this.leftPupil.add(catchlight1);

    const catchlight2 = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 10), this.eyeCatchlightMat);
    catchlight2.position.set(-0.025, -0.025, 0.075);
    this.leftPupil.add(catchlight2);

    this.eyeGroup.add(this.leftPupil);

    // Right patch
    const rightPatch = new THREE.Mesh(patchGeom, this.blackFurMat);
    rightPatch.scale.set(0.9, 1.25, 0.35);
    rightPatch.position.set(0.35, 0.05, 0.7);
    rightPatch.rotation.set(0.1, -0.15, 0.25);
    this.eyeGroup.add(rightPatch);

    // Right Pupil
    this.rightPupil = new THREE.Group();
    this.rightPupil.position.set(0.33, 0.06, 0.78);

    const pupilMeshR = new THREE.Mesh(pupilGeom, this.eyeMat);
    this.rightPupil.add(pupilMeshR);

    const catchlight1R = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), this.eyeCatchlightMat);
    catchlight1R.position.set(0.025, 0.03, 0.075);
    this.rightPupil.add(catchlight1R);

    const catchlight2R = new THREE.Mesh(new THREE.SphereGeometry(0.02, 10, 10), this.eyeCatchlightMat);
    catchlight2R.position.set(-0.025, -0.025, 0.075);
    this.rightPupil.add(catchlight2R);

    this.eyeGroup.add(this.rightPupil);
  }

  buildLimbs() {
    // Sitting legs with cute pink paw pads
    this.buildLegs();

    // Chubby arms with rotation pivots
    this.leftArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-0.62, 0.95, 0.1);
    const leftArmGeom = new THREE.CapsuleGeometry(0.18, 0.45, 16, 16);
    this.leftArm = new THREE.Mesh(leftArmGeom, this.blackFurMat);
    this.leftArm.position.set(0, -0.24, 0.12);
    this.leftArm.rotation.set(0.4, 0, 0.25);
    this.leftArmPivot.add(this.leftArm);
    this.group.add(this.leftArmPivot);

    this.rightArmPivot = new THREE.Group();
    this.rightArmPivot.position.set(0.62, 0.95, 0.1);
    const rightArmGeom = new THREE.CapsuleGeometry(0.18, 0.45, 16, 16);
    this.rightArm = new THREE.Mesh(rightArmGeom, this.blackFurMat);
    this.rightArm.position.set(0, -0.24, 0.12);
    this.rightArm.rotation.set(0.4, 0, -0.25);
    this.rightArmPivot.add(this.rightArm);
    this.group.add(this.rightArmPivot);
  }

  buildLegs() {
    const legGeom = new THREE.CapsuleGeometry(0.22, 0.4, 16, 16);

    // Left leg
    const leftLegGroup = new THREE.Group();
    leftLegGroup.position.set(-0.55, 0.26, 0.4);
    leftLegGroup.rotation.set(-0.25, 0.35, 0);

    const leftLegMesh = new THREE.Mesh(legGeom, this.blackFurMat);
    leftLegMesh.rotation.x = Math.PI / 2.2;
    leftLegGroup.add(leftLegMesh);

    // Paw pad on bottom of foot
    const padGeom = new THREE.CircleGeometry(0.12, 16);
    const padMesh = new THREE.Mesh(padGeom, this.pawPadMat);
    padMesh.position.set(0, 0.05, 0.26);
    padMesh.rotation.y = 0;
    leftLegGroup.add(padMesh);

    // Tiny toe beans
    [-0.07, 0, 0.07].forEach((xOff) => {
      const toe = new THREE.Mesh(new THREE.CircleGeometry(0.04, 12), this.pawPadMat);
      toe.position.set(xOff, 0.19, 0.26);
      leftLegGroup.add(toe);
    });

    this.group.add(leftLegGroup);

    // Right leg
    const rightLegGroup = new THREE.Group();
    rightLegGroup.position.set(0.55, 0.26, 0.4);
    rightLegGroup.rotation.set(-0.25, -0.35, 0);

    const rightLegMesh = new THREE.Mesh(legGeom, this.blackFurMat);
    rightLegMesh.rotation.x = Math.PI / 2.2;
    rightLegGroup.add(rightLegMesh);

    const padMeshR = new THREE.Mesh(padGeom, this.pawPadMat);
    padMeshR.position.set(0, 0.05, 0.26);
    rightLegGroup.add(padMeshR);

    [-0.07, 0, 0.07].forEach((xOff) => {
      const toe = new THREE.Mesh(new THREE.CircleGeometry(0.04, 12), this.pawPadMat);
      toe.position.set(xOff, 0.19, 0.26);
      rightLegGroup.add(toe);
    });

    this.group.add(rightLegGroup);
  }

  buildAccessories() {
    this.accessoryGroup = new THREE.Group();
    this.accessoryGroup.position.set(0, 0.75, 0.65);

    // 1. 3D Heart Prop
    this.heartProp = this.createHeartMesh();
    this.heartProp.scale.set(0.35, 0.35, 0.35);
    this.heartProp.visible = false;
    this.accessoryGroup.add(this.heartProp);

    // 2. Coffee Mug Prop
    this.coffeeProp = this.createCoffeeMugMesh();
    this.coffeeProp.scale.set(0.38, 0.38, 0.38);
    this.coffeeProp.visible = false;
    this.accessoryGroup.add(this.coffeeProp);

    // 3. Chai Glass Prop
    this.chaiProp = this.createChaiGlassMesh();
    this.chaiProp.scale.set(0.38, 0.38, 0.38);
    this.chaiProp.visible = false;
    this.accessoryGroup.add(this.chaiProp);

    this.group.add(this.accessoryGroup);
  }

  createHeartMesh() {
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const heartGeom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeom.center();
    const mesh = new THREE.Mesh(heartGeom, this.heartMat);
    mesh.rotation.z = Math.PI; // Correct orientation
    return mesh;
  }

  createCoffeeMugMesh() {
    const mugGroup = new THREE.Group();
    // Mug body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.3, 0.55, 24),
      this.cupMat
    );
    mugGroup.add(body);

    // Liquid / foam
    const liquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.33, 0.33, 0.05, 24),
      this.coffeeMat
    );
    liquid.position.y = 0.24;
    mugGroup.add(liquid);

    // Latte heart art on top
    const foamHeart = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    foamHeart.position.set(0, 0.27, 0);
    foamHeart.rotation.x = -Math.PI / 2;
    mugGroup.add(foamHeart);

    // Mug handle
    const handleGeom = new THREE.TorusGeometry(0.16, 0.045, 12, 24, Math.PI);
    const handle = new THREE.Mesh(handleGeom, this.cupMat);
    handle.position.set(0.38, 0, 0);
    handle.rotation.z = -Math.PI / 2;
    mugGroup.add(handle);

    return mugGroup;
  }

  createChaiGlassMesh() {
    const chaiGroup = new THREE.Group();
    // Traditional cutting chai ribbed glass
    const glass = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.22, 0.6, 24),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.65,
        roughness: 0.15,
      })
    );
    chaiGroup.add(glass);

    // Steaming hot chai
    const chaiLiquid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.21, 0.5, 24),
      this.chaiMat
    );
    chaiLiquid.position.y = -0.02;
    chaiGroup.add(chaiLiquid);

    return chaiGroup;
  }

  setProp(type) {
    this.holdingItem = type;
    this.heartProp.visible = (type === 'heart');
    this.coffeeProp.visible = (type === 'coffee');
    this.chaiProp.visible = (type === 'chai');

    // Position arms naturally around the held item
    if (type !== 'none' && type !== 'hands') {
      this.leftArmPivot.rotation.set(0.65, 0.35, -0.4);
      this.rightArmPivot.rotation.set(0.65, -0.35, 0.4);
    } else if (type === 'hands') {
      // Arms reaching towards partner
      if (this.isRight) {
        this.leftArmPivot.rotation.set(0.3, 0.3, -0.85); // Left arm towards left partner
        this.rightArmPivot.rotation.set(0.1, 0, -0.15);
      } else {
        this.rightArmPivot.rotation.set(0.3, -0.3, 0.85); // Right arm towards right partner
        this.leftArmPivot.rotation.set(0.1, 0, 0.15);
      }
    } else {
      this.leftArmPivot.rotation.set(0, 0, 0);
      this.rightArmPivot.rotation.set(0, 0, 0);
    }
  }

  triggerWave() {
    this.isWaving = true;
    this.waveTime = 0;
  }

  update(delta, time, targetLook = { x: 0, y: 0 }) {
    // 1. Idle breathing animation
    const breath = Math.sin(time * 2.2 + (this.isRight ? 0.5 : 0)) * 0.025;
    this.bodyMesh.scale.set(1.05 + breath, 1.15 + breath * 1.5, 0.95);
    this.headGroup.position.y = 1.48 + breath * 0.8;

    // 2. Ear wiggle occasionally
    this.earWiggleTimer -= delta;
    if (this.earWiggleTimer <= 0) {
      const wiggle = Math.sin(time * 20) * 0.12;
      this.leftEar.rotation.z = 0.4 + wiggle;
      this.rightEar.rotation.z = -0.4 - wiggle;
      if (this.earWiggleTimer < -0.4) {
        this.earWiggleTimer = Math.random() * 4 + 3;
        this.leftEar.rotation.z = 0.4;
        this.rightEar.rotation.z = -0.4;
      }
    }

    // 3. Eye blinking
    this.blinkTimer -= delta;
    if (this.blinkTimer <= 0) {
      this.isBlinking = true;
      this.blinkProgress += delta * 12;
      const blinkScale = Math.max(0.08, 1 - Math.sin(this.blinkProgress * Math.PI));
      this.eyeGroup.scale.y = blinkScale;
      if (this.blinkProgress >= 1) {
        this.isBlinking = false;
        this.blinkProgress = 0;
        this.eyeGroup.scale.y = 1;
        this.blinkTimer = Math.random() * 3.5 + 2.5;
      }
    }

    // 4. Subtle head look-at smoothing
    const lookX = THREE.MathUtils.clamp(targetLook.x * 0.35, -0.4, 0.4);
    const lookY = THREE.MathUtils.clamp(-targetLook.y * 0.25, -0.25, 0.25);
    this.headGroup.rotation.y = THREE.MathUtils.lerp(this.headGroup.rotation.y, lookX + (this.isRight ? -0.08 : 0.08), 0.08);
    this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, lookY, 0.08);

    // 5. Waving arm animation
    if (this.isWaving) {
      this.waveTime += delta;
      const waveArm = this.isRight ? this.rightArmPivot : this.leftArmPivot;
      waveArm.rotation.x = -1.2;
      waveArm.rotation.z = (this.isRight ? -1.1 : 1.1) + Math.sin(this.waveTime * 12) * 0.35;

      if (this.waveTime > 2.2) {
        this.isWaving = false;
        this.setProp(this.holdingItem);
      }
    }

    // 6. Prop floating animation
    if (this.holdingItem === 'heart') {
      this.heartProp.position.y = Math.sin(time * 3) * 0.05;
      this.heartProp.rotation.y = Math.sin(time * 1.5) * 0.15;
    } else if (this.holdingItem === 'coffee' || this.holdingItem === 'chai') {
      const activeProp = this.holdingItem === 'coffee' ? this.coffeeProp : this.chaiProp;
      activeProp.position.y = Math.sin(time * 2.5) * 0.03;
    }
  }
}

