import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Set
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cam.position.z = 30;

// Geometry
const sphere = new THREE.SphereGeometry(10, 32, 32);

// Materials
const basGreen = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});

const standGrey = new THREE.MeshStandardMaterial({
  color: 0xa3bdc2,
});

// Lighting
const pointLightBlue = new THREE.PointLight(0x00d4ff, 10);
const pointLightRed = new THREE.PointLight(0xff3333, 10);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

pointLightBlue.position.set(5, 5, 5);
pointLightRed.position.set(-5, -5, 5);

// Instances
const sphereMesh = new THREE.Mesh(sphere, basGreen);

// Scene Adding
scene.add(sphereMesh);
scene.add(pointLightBlue);
scene.add(pointLightRed);
scene.add(ambientLight);

// Helpers
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// const axesHelper = new THREE.AxesHelper(30);
// scene.add(axesHelper);


// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
const controls = new OrbitControls(cam, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// Functions
function addStar() {
  const geo = new THREE.SphereGeometry(0.25, 24, 24);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geo, mat);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, cam);
  
  sphereMesh.rotation.x += 0.001;
  sphereMesh.rotation.y += 0.001;
  
  cubeMesh.rotation.x -= 0.001;
  cubeMesh.rotation.y -= 0.001;
  cubeMesh.rotation.z -= 0.001;
}

// Run
Array(400).fill().forEach(addStar);
animate();