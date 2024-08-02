import { BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshPhysicalMaterial, MeshStandardMaterial, RingGeometry, TorusGeometry, MathUtils } from 'three';

function createCube(size, color, position=[0,0,0], rotation=[0,0,0], wireframe = false) {
  // create a geometry
  const geometry = new BoxGeometry(size, size, size);
  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color,
    wireframe:wireframe
   });



  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  // set the cube's position
  cube.position.set(...position);
  cube.rotation.set(...rotation);

  return cube;
}

function createCuboid(size, color, position=[0,0,0], rotation=[0,0,0], wireframe = false) {
  // create a geometry
  const geometry = new BoxGeometry(size.x, size.y, size.z);
  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color,
    wireframe:wireframe
   });



  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  // set the cube's position
  cube.position.set(...position);
  cube.rotation.set(...rotation);

  return cube;
}

function createCubes(scene, transparentWalls = false) {
  const cubes = [
      createCube(10,'white',[10,0,0],[0,0,0],transparentWalls),
      createCube(10,'white',[0,0,-10],[0,0,0],transparentWalls),
      createCube(10,'white',[-10,0,0],[0,0,0],transparentWalls),
      createCube(10,'white',[0,-7,0],[0,0,0],false),
      createCube(10,'white',[0,0,10],[0,0,0],transparentWalls),
      createCube(10,'white',[0,7,0],[0,0,0],false),
  ];

  
  cubes.forEach((cube)=>{
      scene.add(cube);
  });
  return cubes;
}

export { createCube, createCubes,createCuboid };
