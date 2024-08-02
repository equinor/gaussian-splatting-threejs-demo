
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { MathUtils, Vector3, Euler } from 'three/src/Three.js';
import { PointerLockControls } from 'three/examples/jsm/Addons.js';
import { createCollidingSphere } from '../PhysicsWorld/Physics';
import * as THREE from 'three';
import * as RAPIER from '@dimforge/rapier3d';


const keys = {w: false, a: false, s: false, d: false};

class Controls {

    speed = .05;

    handleInput() {
        const direction = new THREE.Vector3();
    
    
        if (keys.w) {
            direction.z = 1;
        }
        if (keys.s) {
            direction.z = -1;
        }
        if (keys.a) {
            direction.x = -1;
        }
        if (keys.d) {
            direction.x = 1;
        }
    
        direction.normalize();
        direction.multiplyScalar(this.speed);

        return direction;
        //body._parent.applyImpulse(new RAPIER.Vector3(direction.x, direction.y, direction.z), true);
    }

    constructor(){
        window.addEventListener("keydown", (event) => {
            keys[event.key] = true;
        });
        
        window.addEventListener("keyup", (event) => {
            keys[event.key] = false;
        });
        
    }
}

class FPSControls extends Controls {
    constructor(params = {}){
        super();
        const camera = params.camera;
        const renderer = params.renderer;
        this.controls = new PointerLockControls(camera, renderer.domElement); 

        document.addEventListener('click', () => {
            if(document.activeElement === renderer.domElement){
                this.controls.lock();
            }
        });

        this.handleInput = ()=>{
            const direction = super.handleInput();
            this.controls.moveForward(direction.z);
            this.controls.moveRight(direction.x);
        }
    }
}


class BallControls extends Controls {

    inputDirection = new THREE.Vector3();

    awake = false; //have controls been used?

    constructor(params){
        super();
        const camera = params.camera;
        const ball = params.ball;    
        const object3d = ball._parent.object3d;  
        camera.lookAt(object3d.position);
        let speed = params.speed ?? 1;
        let deceleration = 0.1;
        this.handleInput = ()=>{

           
            const direction = super.handleInput(); // Example input
            if (direction.x === 0 && direction.y === 0 && direction.z === 0) {
                const currentVelocity = ball._parent.linvel();
                const rigidBody = ball._parent;
                const decelerationImpulse = new RAPIER.Vector3(-currentVelocity.x * deceleration, 0, -currentVelocity.z * deceleration);
                rigidBody.applyImpulse(decelerationImpulse, true);
                rigidBody.setAngvel(new RAPIER.Vector3(rigidBody.angvel().x/1.005, rigidBody.angvel().y/1.005, rigidBody.angvel().z/1.005));
                return;
            }
            if(params.onlyOneThrow && this.awake){
                return;
            }
            this.inputDirection = new THREE.Vector3(direction.x, direction.y, -direction.z);

            this.inputDirection.applyQuaternion(camera.quaternion);

            // Now use inputDirection to apply the impulse in the correct direction
            const inputDirection = this.inputDirection.multiplyScalar(speed);
            ball._parent.applyImpulse(new RAPIER.Vector3(inputDirection.x, inputDirection.y, inputDirection.z));
            this.awake = true;
        }
    }

}




class SplatScaleControls{
    constructor(camera, renderer, onPlus, onMinus){
        //add listeners to +
        this.onPlus = onPlus;
        this.onMinus = onMinus;
        //add listeners to -
        addEventListener('keydown', (event) => {
            if (event.key === '+') {
                this.onPlus();
            }
            if (event.key === '-') {
                this.onMinus();
            }
        });
        
    }
    onPlus(){
    }        
    onMinus(){
    } 
}




export {SplatScaleControls, FPSControls, addTransformControls, BallControls};

let transformControls = null;
let camera;
let cameraControls;
let objects;
let onUpPosition = new Vector3();
let onDownPosition = new Vector3();
let splatScaleControls;


function addTransformControls(cam, renderer, scene, camControls, gaussian){
    cameraControls = camControls;
    transformControls = new TransformControls(cam, renderer.domElement);
    try{
        splatScaleControls = new SplatScaleControls(cam,renderer,
            async ()=>{
                let g = (await gaussian).viewer.splatMesh;
                g.setSplatScale(g.splatScale+0.05);
            },
            async ()=>{
                let g = (await gaussian).viewer.splatMesh;
                
                g.setSplatScale(Math.max(g.splatScale-0.05,0));
            }
        );
    }
    catch(e){
        console.log(e);
    }
    camera = cam;
    objects = scene.children;
    scene.add(transformControls);

    transformControls.setGizmosMaterial = (depthTest)=>{
        transformControls._gizmo.children.forEach((child)=>{
            child.children.forEach((child)=>{
                child.material.depthTest= depthTest;
        })});

    }

    transformControls._gizmo.children.forEach((child)=>{
        child.children.forEach((child)=>{
            child.material.opacity = 1;
            child.material.transparent = false;
            child.material.depthWrite = true;
            child.material.depthTest= true;

    })});
    
    
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener( 'pointerup', onPointerUp );
    document.addEventListener( 'pointerdown', onPointerDown );

    transformControls.addEventListener( 'dragging-changed',onDraggingChanged  );

    transformControls.addEventListener( 'objectChange', function (event) {
        const position = event.target.object.position;
        const rotation = new Euler().setFromQuaternion(event.target.object.quaternion);
        const scale = event.target.object.scale;
        document.getElementById("position").value = `${position.x}, ${position.y}, ${position.z}`
        document.getElementById("rotation").value = `${rotation.x}, ${rotation.y}, ${rotation.z}`
        document.getElementById("scale").value = `${scale.x}, ${scale.y}, ${scale.z}`
        document.getElementById("arrays").value = `{position:[${position.x}, ${position.y}, ${position.z}], rotation:[${rotation.x}, ${rotation.y}, ${rotation.z}], scale:[${scale.x}, ${scale.y}, ${scale.z}]}`

    } );
    window.addEventListener('objectChange',event=>{
    });
    window.addEventListener('keydown',onKeyDown );


    return transformControls;

}
const raycaster = new THREE.Raycaster();


const onKeyDown = (event) => {
    const keyActions = {
        't': 'translate',
        'r': 'rotate',
        's': 'scale'
    };
    const action = keyActions[event.key];
    if (action) {
        transformControls.setMode(action);
    }
};

function onDraggingChanged( event ) {
    cameraControls.enabled = ! event.value;

    const isSplatObject = event.target.object.splatObject != null;
    event.target.setGizmosMaterial(isSplatObject);

    const isPhysicsObject = event.target.object.collider != null;
    if (isPhysicsObject) {
        event.target.object.collider
    }
}


function onPointerMove( event ) {
    let pointer = {x:0, y:0};
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( pointer, camera );

    const intersects = raycaster.intersectObjects( objects, false );

    if ( intersects.length > 0 ) {

        const object = transformControls.object ?? intersects[ 0 ].object;

        if (object !== transformControls.object ) {

            transformControls.attach( object );

        }

    }

}

function onPointerUp( event ) {

    onUpPosition.x = event.clientX;
    onUpPosition.y = event.clientY;

    transformControls.detach();
}

function onPointerDown( event ) {

    onDownPosition.x = event.clientX;
    onDownPosition.y = event.clientY;

}