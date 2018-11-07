import * as THREE from 'three';

export default class Input {
	constructor(game) {
		this.game = game;
		this.cursor = new THREE.Vector2();
		this.position = new THREE.Vector3();

		this.raycaster = new THREE.Raycaster();

		this.setup();
	}

	setup() {
		this.game.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
		this.game.renderer.domElement.addEventListener('mousedown', this.onMouseDown, false);
	}

	dispose() {
		this.game.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
		this.game.renderer.domElement.removeEventListener('mousedown', this.onMouseDown);
	}

	onMouseMove = e => {
		this.cursor.x = e.offsetX;
		this.cursor.y = e.offsetY;
	};

	onMouseDown = e => {};

	update = () => {
		const origin = new THREE.Vector2(
			(this.cursor.x / game.width) * 2 - 1,
			-(this.cursor.y / game.height) * 2 + 1
		);

		this.raycaster.setFromCamera(origin, this.game.camera);
		const intersects = this.raycaster.intersectObjects(this.game.scene.children, true);

		for (let i = 0; i < intersects.length; i++) {
			const intersect = intersects[i];

			if (intersect.object.name === 'ground') {
				this.position.copy(intersect.point);
			}
		}
	};
}
