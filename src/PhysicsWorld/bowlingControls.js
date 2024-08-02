import * as THREE from 'three';



let cylinder;
let line;

export const addBowlingGUILines = (scene,loop,ball,camera) => {

    const lineMaterial = new THREE.LineBasicMaterial( { color: 'red' } );
    const lineGeometry = new THREE.BufferGeometry().setFromPoints( [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0)] );
    line = new THREE.Line( lineGeometry, lineMaterial );
    var geometry = new THREE.CylinderGeometry( 0, .3, 1, 2 );
    var material = new THREE.MeshBasicMaterial( {color: 'red' , wireframe:false} );
    cylinder = new THREE.Mesh( geometry, material );
    scene.add( cylinder );    
    scene.add(line);
    const direction = new THREE.Vector3(0,0,-1);
    const updateLine = (ball) => {
        const ballPos = ball.position;
        camera.getWorldDirection(direction);
        direction.set(direction.x,0,direction.z).normalize();
        const finalPosition = ballPos.clone().add(direction.multiplyScalar(10));
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( [finalPosition, ballPos] );
        line.geometry = lineGeometry;
        cylinder.position.copy(finalPosition);
        cylinder.rotation.z = -Math.PI/2;
        cylinder.rotation.y = Math.atan2(direction.x    ,direction.z) - Math.PI/2;
    }
    const update = () => {
        updateLine(ball);
    }


    loop.updatables.push({tick:update});
}

export const GUISetActive = (active) => {
    console.log(active);
    cylinder.visible = active;
    line.visible = active;
}

export const addBowlingControls = (controls, sphere, loop, camera, maximumCameraDistance) => {

    const distance = maximumCameraDistance;
    const direction = new THREE.Vector3();
    const max = (vec1,vec2) => {
        //compare lengths with THREE Vector3 methods
        if(vec1.lengthSq() > vec2.lengthSq()){
            return vec1;
        }
        else{
            return vec2;
        }
    }
    const moveToTarget = (camera,target) => {
        const position1 = camera.position.clone();
        const position2 = target.position.clone();
        camera.lookAt(target.position);
        if(position1.distanceTo(position2) < distance){
            return;
        }
        direction.subVectors(position2, position1);
        if(position1.distanceTo(position2) > distance*1.5){
            camera.position.add(direction.multiplyScalar(0.05));
        }
        else{
            camera.position.add(direction.normalize().multiplyScalar(0.1));
        }
    }
    const setTarget = (target) => {
        controls.target.set(target.position.x, target.position.y, target.position.z);
    }

    loop.updatables.push({tick:()=>
    {
        setTarget(sphere);
        moveToTarget(camera,sphere);
    }});
}




export const setupGUI = (controls) => {
    const oldHandleInput = controls.handleInput; 
    controls.handleInput = () => {
        oldHandleInput();
        GUISetActive(!controls.awake);
    }
}