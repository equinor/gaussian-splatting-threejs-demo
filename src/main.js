import { ModelWorld } from './ModelWorld/World.js';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  const world = new ModelWorld(container);

  await world.init();
  // 2. Render the scene
  world.start();

  const loadSecondDemoButton = document.getElementById('reveal');
  let loaded = false;

  loadSecondDemoButton.addEventListener('click', () => {
    if(loadSecondDemoButton.checked){
      
      if(loaded){
        world.showSecondDemo();
      }
      else{
        world.loadSecondDemo();
        loaded = true;
      }
    }
    else{
      world.hideSecondDemo();
    }

    console.log('clicked');
  });
}




main().catch((err) => {
  console.error(err);
});

