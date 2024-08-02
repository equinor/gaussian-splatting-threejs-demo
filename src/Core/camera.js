import { PerspectiveCamera } from 'three';

function createCamera(position,lookAt) {
  const camera = new PerspectiveCamera(
    90, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000, // far clipping plane
  );

  // move the camera back so we can view the scene
  //camera.position.set(-7.21, 25.17, 10.80);

  camera.position.copy(position);
  camera.lookAt(lookAt);


  camera.tick = (delta)=>{
  }

  return camera;
}

export { createCamera };
