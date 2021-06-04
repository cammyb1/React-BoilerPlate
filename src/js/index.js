import * as THREE from 'three'

const main = document.getElementById('main');

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const mouse = new THREE.Vector2();

main.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneBufferGeometry(100, 100, 100, 100);
const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe:true } );
const plane = new THREE.Mesh(geometry, material);

const ballgeo = new THREE.SphereBufferGeometry(5, 10, 10);
const ballmat = new THREE.MeshBasicMaterial({ color: 'red' });
const miniBall = new THREE.Mesh(ballgeo, ballmat);

camera.position.z = 5;

miniBall.scale.multiplyScalar(-0.01)

scene.add(plane)
scene.add(miniBall)

const raycaster = new THREE.Raycaster()

const onMouseMove = (event) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false)

plane.rotateX(-Math.PI/4)

const animate = () => {

    raycaster.setFromCamera(mouse, camera);

    const [intersection] = raycaster.intersectObject(plane);
    
    if(intersection.point){
        miniBall.position.set(intersection.point.x, intersection.point.y, intersection.point.z)
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

animate()
