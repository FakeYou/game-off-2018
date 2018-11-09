import * as THREE from 'three';
import random from 'lodash/random';

import { Circle } from '../systems/Physics';

export default class Sheep extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Ball';

		this.add(
			new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshNormalMaterial({ wireframe: true }))
		);
		this.body = this.game.physics.createDynamicBody(Circle(1), 2);

		this.body.setPosition({ x: random(-22, 22, true), y: random(-22, 22, true) });
		this.body.setLinearDamping(5);
	}
}
