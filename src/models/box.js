import * as THREE from 'three';
import * as Matter from 'matter-js';

import { SCALE } from '../physics';
import createSync from './sync';

const createBox = ({ width, height, depth, isStatic }) => {
	const mesh = new THREE.Mesh(
		new THREE.BoxGeometry(width, depth, height),
		new THREE.MeshNormalMaterial({ wireframe: false })
	);

	const body = Matter.Bodies.rectangle(0, 0, width * SCALE, height * SCALE, { isStatic });

	return {
		mesh,
		body,
		...createSync(mesh, body)
	};
};

export default createBox;
