import { createCollidingCube } from "../PhysicsWorld/Physics";

import { createCubes } from "./cube";

import { setTransform } from "./util";

import * as THREE from 'three';


export function setupRoomWalls(scene){
    const walls = createCubes(scene, false);
    const [leftWall, backWall, rightWall, floor, forwardWall, topWall] = walls;
    setTransform(leftWall, {position:[5.015534665269622, -0.014040171664235102, 0], rotation:[0, 0, 0], scale:[0.006453843721295883, 0.39186835625579497, 1]});
    setTransform(rightWall,{position:[-5.015534665269622, -0.014040171664235102, 0], rotation:[0, 0, 0], scale:[0.006453843721295883, 0.39186835625579497, 1]});
    setTransform(backWall, {position:[0, -0.014040171664235102, -5.015534665269622],rotation: [0, -Math.PI/2, 0],scale: [0.006453843721295883, 0.39186835625579497, 1]});
    setTransform(forwardWall, {position:[0, -0.014040171664235102, 5.015534665269622], rotation:[0, -1.5707963267948966, 0], scale:[0.006453843721295883, 0.39186835625579497, 1]});
    setTransform(floor, {position:[-0.022709014570604813, -2.0722376307294756, -0.015160369912380178], rotation:[0, 0, 0], scale:[1, 0.020611448396621903, 1]});
    setTransform(topWall, {position:[-0.022709014570604813, 2.0722376307294756, -0.015160369912380178], rotation:[0, 0, 0], scale:[1, 0.020611448396621903, 1]});

    
    floor.material = new THREE.MeshBasicMaterial({color:0xffffff});
    const material = floor.material;

    material.map = new THREE.TextureLoader().load('labFloor.jpg');
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 5, 5 );


    return walls;
}

export function setupBowlingWalls(scene){
    const walls = createCubes(scene, true);
        const [leftWall, backWall, rightWall, floor, forwardWall, topWall] = walls;
        setTransform(leftWall, {position:[5.015534665269622, -0.014040171664235102, 0], rotation:[0, 0, 0], scale:[0.06453843721295883, 0.39186835625579497, 1]});
        setTransform(rightWall,{position:[-69.72941536822103, -0.014040171664235102, 0], rotation:[0, 0, 0], scale:[0.06453843721295883, 0.39186835625579497, 1]});
        setTransform(backWall, {position:[-31.798771742529837, -0.014040171664235102, -5.015534665269622],rotation: [0, -Math.PI/2, 0],scale: [0.006453843721295883, 0.39186835625579497, 7.585156207549552]});
        setTransform(forwardWall, {position:[-31.798771742529837, -0.014040171664235102, 5.015534665269622], rotation:[0, -1.5707963267948966, 0], scale:[0.006453843721295883, 0.39186835625579497, 7.585156207549552]});
        setTransform(floor, {position:[-31.798771742529837, -1.9222376307294756, -0.015160369912380178], rotation:[0, 0, 0], scale:[7.585156207549552, 0.020611448396621903, 1]});
        setTransform(topWall, {position:[-31.798771742529837, 2.0722376307294756, -0.015160369912380178], rotation:[0, 0, 0], scale:[7.585156207549552, 0.020611448396621903, 1]});

        const material = floor.material;
        material.map = new THREE.TextureLoader().load('woodFloor.jpg');
        material.map.wrapS = THREE.RepeatWrapping;
        material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set( 5, 5 );


        walls.forEach((wall)=>{
            wall.collider = createCollidingCube(wall,false,0.5);
        });
        return walls;
}
