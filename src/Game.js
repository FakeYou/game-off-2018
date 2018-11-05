import * as THREE from 'three';

import createPhysics from './physics';
import createRenderer from './renderer';

import createBox from './models/box';
import createLevel from './models/level';

const createGame = () => {
	const renderer = createRenderer();
	const physics = createPhysics();

	let level;
	import('./assets/maps/playground.json').then(definition => {
		level = createLevel(definition, physics);
		renderer.addMesh(level.mesh);
	});

	let frame = null;
	const update = () => {
		physics.update();
		renderer.update();
		level && level.update();
		frame = requestAnimationFrame(update);
	};

	const dispose = () => {
		cancelAnimationFrame(frame);
		physics.dispose();
		renderer.dispose();
	};

	return {
		physics,
		update,
		dispose
	};
};

const game = createGame();
game.update();

window.game = game;

if (module.hot) {
	module.hot.dispose(() => {
		game && game.dispose();
	});
}
