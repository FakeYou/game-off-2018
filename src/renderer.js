import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

const createRenderer = () => {
	const width = 1040;
	const height = 640;

	let scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
	camera.position.set(0, 30, 0);

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	renderer.setClearColor(0xeae0e2);

	// TODO: Remove side-effect
	document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);

	return {
		addMesh: mesh => scene.add(mesh),
		update: () => renderer.render(scene, camera),
		dispose: () => {
			renderer.domElement.remove();
			renderer.dispose();
			controls.dispose();
		}
	};
};

export default createRenderer;
