export default class Keyboard {
	constructor(game) {
		this.game = game;
		this.keys = {};

		this.setup();
	}

	setup() {
		document.addEventListener('keydown', this.onKeyDown, false);
		document.addEventListener('keyup', this.onKeyUp, false);
		this.game.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);
		this.game.renderer.domElement.addEventListener('mousedown', this.onMouseDown, false);
	}

	dispose() {
		document.removeEventListener('keydown', this.onKeyDown);
		document.removeEventListener('keyup', this.onKeyUp);
		this.game.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
		this.game.renderer.domElement.removeEventListener('mousedown', this.onMouseDown);
	}

	isPressed(keyCode) {
		return !!this.keys[keyCode];
	}

	onKeyDown = e => {
		this.keys[e.keyCode] = true;
	};

	onKeyUp = e => {
		this.keys[e.keyCode] = false;
	};

	onMouseMove = e => {
		// this.mouse.x = (e.offsetX / game.width) * 2 - 1;
		// this.mouse.y = -(e.offsetY / game.height) * 2 + 1;
	};

	onMouseDown = e => {};
}
