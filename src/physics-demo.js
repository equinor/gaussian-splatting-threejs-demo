import { PhysicsWorld } from './PhysicsWorld/World.js';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  const world = new PhysicsWorld(container);


  await world.init();

  // 2. Render the scene
  world.start();

  const resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', () => {
    console.log('resetting');
    world.resetBowlingScene();
  });
}

main().catch((err) => {
  console.error(err);
});