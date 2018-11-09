import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import { KEY_SHIFT } from 'keycode-js';

import Keyboard from './systems/Keyboard';
import Mouse from './systems/Mouse';
import Physics from './systems/Physics';

import Level from './entities/Level';
import Ground from './entities/Ground';
import Cursor from './entities/Cursor';
import Ball from './entities/Ball';
import Arrow from './entities/Arrow';
import Wall from './entities/Wall';
import Sheep from './entities/Sheep';

import playground from './assets/maps/playground';

class Game {
	constructor(domElement) {
		this.width = 1040;
		this.height = 640;
		this.domElement = domElement;

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0xeae0e2);
		domElement.appendChild(this.renderer.domElement);

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
		this.camera.position.set(4, 4, 4);

		// this.scene.add(new THREE.AxesHelper(4));

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.physics = new Physics(this);
		this.keyboard = new Keyboard(this);
		this.mouse = new Mouse(this);

		this.entities = [];

		this.create();
		this.update();
	}

	addEntity = entity => {
		this.scene.add(entity);
		this.entities.push(entity);
	};

	create = () => {
		this.addEntity(new Level(this, playground));

		this.addEntity(new Ground(this));
		this.addEntity(new Cursor(this));
		this.addEntity(new Ball(this));
		this.addEntity(new Arrow(this));
	};

	update = () => {
		this.physics.update();
		this.mouse.update();
		this.controls.enableRotate = this.keyboard.isPressed(KEY_SHIFT);

		this.entities.forEach(entity => {
			entity.update && entity.update();
		});

		this.renderer.render(this.scene, this.camera);

		this.animationFrame = requestAnimationFrame(this.update);
	};

	dispose = () => {
		cancelAnimationFrame(this.animationFrame);
		this.renderer.domElement.remove();
		this.renderer.dispose();
		this.controls.dispose();
		this.keyboard.dispose();
		this.mouse.dispose();
	};
}

export default Game;
