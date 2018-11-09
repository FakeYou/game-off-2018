import * as Planck from 'planck-js';

export default class Physics {
	constructor(game) {
		this.game = game;

		this.world = new Planck.World();
	}

	createDynamicBody(shape, mass) {
		const body = this.world.createBody({
			type: 'dynamic'
		});

		body.createFixture(shape, mass);
		return body;
	}

	createBody(shape) {
		const body = this.world.createBody();
		body.createFixture(shape, 0);
		return body;
	}

	update() {
		this.world.step(1 / 60);

		this.game.entities.forEach(entity => {
			if (entity.body) {
				const position = entity.body.getPosition();

				entity.position.set(position.x, 0, position.y);
			}
		});
	}
}

export const Circle = radius => Planck.Circle(radius);
export const Box = (width, height) => Planck.Box(width / 2, height / 2);
