// Import directly from jsDelivr CDN
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js";
import { ARButton } from "https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/webxr/ARButton.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.154.0/examples/jsm/controls/OrbitControls.js";

let camera, scene, renderer, earth;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Earth sphere
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load("assets/earth.jpg");

  const geometry = new THREE.SphereGeometry(0.3, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: earthTexture });
  earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  // AR button
  document.body.appendChild(ARButton.createButton(renderer));

  // Handle resizing
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {
  earth.rotation.y += 0.01; // rotate Earth
  renderer.render(scene, camera);
}
