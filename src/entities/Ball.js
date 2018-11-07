import * as THREE from 'three';

import { Circle } from '../systems/Physics';

export default class Ball extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Ball';

		this.add(new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshNormalMaterial()));
		this.body = this.game.physics.createDynamicBody(Circle(1), 0.1);

		this.body.setPosition({ x: 0, y: -10 });
	}
}
