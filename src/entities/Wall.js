import * as THREE from 'three';

import { Box } from '../systems/Physics';

export default class Ground extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Wall';

		this.add(
			new THREE.Mesh(
				new THREE.BoxGeometry(10, 1, 1),
				new THREE.MeshNormalMaterial({ wireframe: true })
			)
		);

		this.body = this.game.physics.createBody(Box(10, 1));
	}
}
