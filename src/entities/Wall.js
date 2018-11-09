import * as THREE from 'three';

import { Box } from '../systems/Physics';

export default class Ground extends THREE.Group {
	constructor(game, side) {
		super();

		this.game = game;
		this.name = 'Wall';

		this.add(
			new THREE.Mesh(
				new THREE.BoxGeometry(50, 1, 1),
				new THREE.MeshNormalMaterial({ wireframe: true })
			)
		);

		if (side === 'south') {
			this.body = this.game.physics.createBody(Box(50, 1));
			this.body.setPosition({ x: 0, y: 25 });
		}
		else if (side === 'north') {
			this.body = this.game.physics.createBody(Box(50, 1));
			this.body.setPosition({ x: 0, y: -25 });
		}
		if (side === 'west') {
			this.body = this.game.physics.createBody(Box(1, 50));
			this.body.setPosition({ x: -25, y: 0 });
			this.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
		}
		if (side === 'east') {
			this.body = this.game.physics.createBody(Box(1, 50));
			this.body.setPosition({ x: 25, y: 0 });
			this.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
		}
	}
}
