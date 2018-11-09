import * as THREE from 'three';

export const BUTTON_LEFT = 0;
export const BUTTON_MIDDLE = 1;
export const BUTTON_RIGHT = 2;

export default class Input {
	constructor(game) {
		this.game = game;
		this.cursor = new THREE.Vector2();
		this.position = new THREE.Vector3();

		this.raycaster = new THREE.Raycaster();

		this.buttons = {};

		this.setup();
	}

	setup() {
		this.game.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
		this.game.renderer.domElement.addEventListener('mousedown', this.onMouseDown, false);
		this.game.renderer.domElement.addEventListener('mouseup', this.onMouseUp, false);
	}

	dispose() {
		this.game.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
		this.game.renderer.domElement.removeEventListener('mousedown', this.onMouseDown);
		this.game.renderer.domElement.removeEventListener('mouseup', this.onMouseUp);
	}

	onMouseMove = e => {
		this.cursor.x = e.offsetX;
		this.cursor.y = e.offsetY;
	};

	onMouseDown = e => {
		this.buttons[e.button] = {
			isDown: true,
			isPressed: false,
			frames: 0
		};
	};

	onMouseUp = e => {
		this.buttons[e.button] = {
			isDown: false,
			isPressed: false,
			frames: -1
		};
	};

	isPressed(button) {
		return (this.buttons[button] || {}).isPressed;
	}

	isDown(button) {
		return (this.buttons[button] || {}).isDown;
	}

	update = () => {
		Object.keys(this.buttons).forEach(key => {
			const button = this.buttons[key];

			if (button.isDown) {
				button.frames += 1;
				button.isPressed = button.frames === 1;
			}
		});

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
