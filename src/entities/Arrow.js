import * as THREE from 'three';

export default class Arrow extends THREE.Group {
	constructor(game) {
		super();

		this.game = game;
		this.name = 'Arrow';

		// this.mesh = new THREE.ArrowHelper();
		// this.add(this.mesh);

		this.ball = this.game.entities.filter(entity => entity.name === 'Ball')[0];
	}

	update() {
		// this.position.copy(this.ball.position);
		// this.mesh.setLength(this.position.distanceTo(this.game.mouse.position));
		// this.mesh.setDirection(new THREE.Vector3().subVectors(this.position, this.game.mouse.position));
	}
}
