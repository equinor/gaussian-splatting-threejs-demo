import { WebGLRenderer } from 'three';

function createRenderer() {
  const canvas = document.querySelector('canvas[tabindex="1"]');

  const renderer = new WebGLRenderer({canvas:canvas, antialias:true});
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export { createRenderer };
