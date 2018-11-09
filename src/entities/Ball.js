import * as THREE from 'three';

import { Circle } from '../systems/Physics';
import { BUTTON_LEFT } from '../systems/Mouse';

export default class Ball extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Ball';

		this.add(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshNormalMaterial()));
		this.body = this.game.physics.createDynamicBody(Circle(1), 5);

		this.body.setPosition({ x: 0, y: -10 });
		this.body.setLinearDamping(2);
	}

	update() {
		if (this.game.mouse.isPressed(BUTTON_LEFT)) {
			const origin = this.game.mouse.position.clone();
			origin.sub(this.position);
			origin.multiplyScalar(-1 * 3500);

			this.body.applyForce({ x: origin.x, y: origin.z }, this.body.getPosition(), true);
		}

		this.game.camera.position.copy(this.position).sub(new THREE.Vector3(-10, -12, 10));
		this.game.camera.lookAt(this.position);
	}
}
