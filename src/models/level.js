import * as THREE from 'three';
import * as Matter from 'matter-js';
import find from 'lodash/find';

import { SCALE } from '../physics';
import createBox from './box';

const createLevel = (definition, physics) => {
	const ground = find(definition.layers, { name: 'ground' });
	const walls = find(definition.layers, { name: 'walls' });

	const geometry = new THREE.BoxGeometry(1, 0.1, 1);
	const material = new THREE.MeshNormalMaterial({ wireframe: true });

	const mesh = new THREE.Group();

	ground.chunks.forEach(chunk => {
		const group = new THREE.Group();
		group.position.set(chunk.x, 0, chunk.y);
		mesh.add(group);

		chunk.data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const tile = new THREE.Mesh(geometry, material);
			tile.position.set(i % 16, 0, Math.floor(i / 16));
			group.add(tile);
		});
	});

	walls.chunks.forEach(chunk => {
		chunk.data.forEach((gid, i) => {
			if (gid === 0) {
				return;
			}

			const box = createBox({ width: 1.1, height: 1.1, depth: 1.1, isStatic: true });
			const x = (i % 16) + chunk.x;
			const y = Math.floor(i / 16) + chunk.y;

			box.setPosition(new THREE.Vector3(x, 0, y));

			mesh.add(box.mesh);
			physics.addBody(box.body);
		});
	});

	const update = () => {
		box.sync();
	};

	const box = createBox({ width: 0.5, height: 0.5, depth: 0.5 });
	box.setPosition(new THREE.Vector3(-2, 0, -6));

	const anchor = { x: -2 * SCALE, y: -6 * SCALE };
	Matter.World.add(physics.engine.world, anchor);

	const constraint = Matter.Constraint.create({
		pointA: anchor,
		bodyB: box.body,
		stiffness: 0.01
	});

	Matter.World.add(physics.engine.world, constraint);

	mesh.add(box.mesh);
	physics.addBody(box.body);

	return {
		mesh,
		update
	};
};

export default createLevel;
