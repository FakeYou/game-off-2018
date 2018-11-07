import * as THREE from 'three';

export default class Cursor extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Cursor';

		this.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 5, 2), new THREE.MeshNormalMaterial()));
	}

	update() {
		this.position.copy(this.game.mouse.position);
	}
}
