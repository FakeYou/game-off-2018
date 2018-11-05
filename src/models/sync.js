import * as Matter from 'matter-js';

import { SCALE } from '../physics';

const createSync = (mesh, body) => ({
	setPosition: vec => {
		mesh.position.copy(vec);
		Matter.Body.setPosition(body, { x: vec.x * SCALE, y: vec.z * SCALE });
	},
	setAngle: angle => {
		mesh.rotation.y = -body.angle;
		Matter.Body.setAngle(body, angle);
	},
	sync: () => {
		mesh.position.x = body.position.x / SCALE;
		mesh.position.z = body.position.y / SCALE;
		mesh.rotation.y = -body.angle;
	}
});

export default createSync;
