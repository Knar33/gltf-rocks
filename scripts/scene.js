import { generateRock } from "./gltf-rock.js";

const scene = new THREE.Scene();
const color = 0xFFFFFF;
const density = .04;
scene.fog = new THREE.FogExp2(color, density);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var meshes = [];
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
        let mesh = generateRock((i * 10) + j);
        mesh.position.y = i * 4;
        mesh.position.x = j * 4;
        console.log(mesh)
        meshes.push(mesh);
        scene.add(mesh);
    }
}

camera.position.z = 20;
camera.position.x = 40;
camera.position.y = 20;

function animate() {
    for (let i = 0; i < meshes.length; i++) {
        meshes[i].rotation.x += 0.005;
        meshes[i].rotation.y += 0.01;
        meshes[i].rotation.z += 0.015;
    }
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();