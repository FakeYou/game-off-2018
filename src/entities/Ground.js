import * as THREE from 'three';

export default class Ground extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Ground';

		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry(500, 500, 1, 1),
			new THREE.MeshNormalMaterial({ wireframe: true })
		);

		plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / -2);
		plane.name = 'ground';

		this.add(plane);
	}
}
