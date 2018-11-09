import * as THREE from 'three';

import { Box } from '../../systems/Physics';

export const SCALE = 2;

export default class Level extends THREE.Group {
	constructor(game, definition) {
		super();
		this.game = game;
		this.definition = definition;

		this.tileHeight = definition.tileheight;
		this.tileWidth = definition.tilewidth;

		definition.layers.forEach(layer => {
			switch (layer.name) {
			case 'terrain':
				this.createTerrain(layer);
				break;

			case 'wall':
				this.createWall(layer);
				break;

			case 'roof':
				this.createRoof(layer);
				break;

			case 'collision':
				this.createCollision(layer);
				break;

			default:
				console.warn(`Unexpected ${layer.type} "${layer.name}" found.`);
			}
		});
	}

	createTerrain(layer) {
		layer.chunks.forEach(chunk => {
			chunk.data.forEach((gid, index) => {
				if (gid === 0) {
					return;
				}

				const tile = this.createTile(gid);
				tile.rotation.x = -Math.PI / 2;
				tile.position.copy(this.getGlobalPosition(index, chunk));
				this.add(tile);
			});
		});
	}

	createWall(layer) {
		layer.chunks.forEach(chunk => {
			chunk.data.forEach((gid, index) => {
				if (gid === 0) {
					return;
				}

				const tile = this.createTile(gid);
				tile.position.copy(this.getGlobalPosition(index, chunk));
				tile.position.y = SCALE / 2;

				const n = tile.clone();
				n.position.z += SCALE / -2;
				n.rotation.y = Math.PI;
				this.add(n);

				const s = tile.clone();
				s.position.z -= SCALE / -2;
				s.rotation.y = 0;
				this.add(s);

				const e = tile.clone();
				e.position.x -= SCALE / -2;
				e.rotation.y = Math.PI / 2;
				this.add(e);

				const w = tile.clone();
				w.position.x += SCALE / -2;
				w.rotation.y = -Math.PI / 2;
				this.add(w);
			});
		});
	}

	createRoof(layer) {
		layer.chunks.forEach(chunk => {
			chunk.data.forEach((gid, index) => {
				if (gid === 0) {
					return;
				}

				const tile = this.createTile(gid);
				tile.rotation.x = -Math.PI / 2;
				tile.position.copy(this.getGlobalPosition(index, chunk));
				tile.position.y = SCALE;
				this.add(tile);
			});
		});
	}

	createCollision(layer) {
		console.log(layer);

		layer.objects.forEach(object => {
			const width = (object.width / this.tileWidth) * SCALE;
			const height = (object.height / this.tileHeight) * SCALE;

			const x = (object.x / this.tileWidth) * SCALE + width / 2 - SCALE / 2;
			const y = (object.y / this.tileHeight) * SCALE + height / 2 - SCALE / 2;

			const mesh = new THREE.Mesh(
				new THREE.BoxGeometry(width, 2 * SCALE, height),
				new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
			);

			mesh.position.x = x;
			mesh.position.z = y;
			this.add(mesh);

			const body = this.game.physics.createBody(Box(width, height));
			body.setPosition({ x, y });
		});
	}

	createTile(gid) {
		return new THREE.Mesh(
			new THREE.PlaneGeometry(SCALE, SCALE),
			new THREE.MeshBasicMaterial({ color: colors[gid] || 0xff00ff })
		);
	}

	createCube(gid) {
		return new THREE.Mesh(
			new THREE.BoxGeometry(SCALE, SCALE, SCALE),
			new THREE.MeshBasicMaterial({ color: colors[gid] || 0xff00ff })
		);
	}

	getGlobalPosition(index, chunk) {
		return new THREE.Vector3(
			((index % chunk.width) + chunk.x) * SCALE,
			0,
			(Math.floor(index / chunk.width) + chunk.y) * SCALE
		);
	}
}

const colors = [
	0xff00ff,
	0x69d2e7,
	0xa7dbd8,
	0xc5e0dc,
	0xe0e4cc,
	0x3b8686,
	0x79bd9a,
	0xa8dba8,
	0xcff09e,
	0x542437,
	0xc02942,
	0xc44d58,
	0xff6b6b,
	0x774f38,
	0xe08e79,
	0xf1d4af,
	0xece5ce
];
