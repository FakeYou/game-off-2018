import * as Matter from 'matter-js';

export const SCALE = 20;

const createPhysics = () => {
	const engine = Matter.Engine.create();
	const renderer = Matter.Render.create({
		element: document.body,
		engine
	});

	engine.world.gravity.x = 0;
	engine.world.gravity.y = 0;

	// TODO: Remove side-effect
	Matter.Render.run(renderer);
	Matter.Render.lookAt(renderer, [{ x: 0, y: 0 }], { x: 300, y: 300 });

	const mouse = Matter.Mouse.create(renderer.canvas);
	const mouseConstraint = Matter.MouseConstraint.create(engine, {
		mouse: mouse,
		constraint: {
			stiffness: 0.2,
			render: {
				visible: false
			}
		}
	});

	Matter.World.add(engine.world, mouseConstraint);
	renderer.mouse = mouse;

	return {
		engine,
		addBody: body => Matter.World.add(engine.world, body),
		update: () => Matter.Engine.update(engine, 1000 / 60),
		dispose: () => {
			Matter.World.clear(engine.world);
			Matter.Engine.clear(engine);
			renderer.canvas.remove();
		}
	};
};

export default createPhysics;
