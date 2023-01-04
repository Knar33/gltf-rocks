import { generateRock } from "./gltf-rock.js";

const scene = new THREE.Scene();
const color = 0xFFFFFF;
const density = 0.15;
scene.fog = new THREE.FogExp2(color, density);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const mesh = generateRock(1);
scene.add(mesh);

camera.position.z = 5;

function animate() {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.015;
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();