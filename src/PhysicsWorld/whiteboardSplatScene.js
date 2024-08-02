import { Object3D } from "three";

import { overrideProperties } from "../Core/util";

import { createCuboid } from "../Core/cube";

import { createCollidingCube } from "./Physics";

export const whiteboardScene = async (gaussian,sphere,world) => {

    await gaussian.addScene('ole/splat.ply', 'ole');
    for(let i = 0; i<10; i++){
        await gaussian.addScene('paneltrue/splat.ply', `dog${i}`);
    }
    

    gaussian.setupScenes();
    
    const ole = gaussian.getScene('ole');
    const object3D = new Object3D();
    sphere.add(object3D);
    overrideProperties(object3D, ole);
    gaussian.setTransform(ole,{rotation:[-Math.PI,0,0]});
    world.bindPositionAndRotation(sphere, object3D, {position:[0,0,0], rotation:[0,0,0]});


    let i = 0;
    setInterval(()=>{
        if(i >= 10) return;
        let random = [Math.random()*6, -1.5, Math.random()*6];
        let cube = createCuboid({x:.5,y:.8,z:.05}, 'white', random, [Math.PI, 0, 0], true);
        world.scene.add(cube);
        cube.collider = createCollidingCube(cube,true,0);
        const dog = gaussian.getScene(`dog${i}`);
        overrideProperties(cube, dog);
        i++;

    }, 500);
}