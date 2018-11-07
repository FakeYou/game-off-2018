import * as THREE from 'three';
import * as Planck from 'planck-js';

import Game from './Game';

window.game = new Game(document.getElementById('game'));
window.THREE = THREE;
window.Planck = Planck;

if (module.hot) {
	module.hot.dispose(() => {
		window.game && window.game.dispose();
	});
}
