
import { createLights } from '../Core/light.js';
import { Color, Object3D, Quaternion, Vector3, Euler } from 'three';
import { Loop } from '../Core/Loop.js';
import { GaussianScene } from './gaussian.js';
import { createCollidingCube, initRapier, createCollidingSphere, getUpdatePhysics } from './Physics.js';
import { createSphere } from './sphere.js';
import {World} from '../World.js';
import * as THREE from 'three';
import { setupBowlingWalls } from '../Core/walls.js';
import { getBowlingBall } from './bowlingBall.js';
import { addBowlingGUILines, addBowlingControls, setupGUI } from './bowlingControls.js';
import { EXRLoader } from 'three/examples/jsm/Addons.js';


const ballAdditionalMass = 2;
const pinsAdditionalMass = 1;
const pinFriction = 100;
const pinRows = 5;
const pinSpacingMultiplier = 0.5;
const pinsDistanceAdd = 0;
const maximumCameraDistance = 5;
const ballSpeed = 20000;

let controls, control2;
class PhysicsWorld extends World {


    setupWalls(scene){
        setupBowlingWalls(scene);
    }
    bindPositionAndRotation(source,target, {position = [0,0,0], rotation = [0,0,0]} = {}){
        
        this.loop.updatables.push({tick:()=>{
            target.position.set(source.position.x+position[0], source.position.y+position[1], source.position.z+position[2]);
            target.rotation.set(source.rotation.x,source.rotation.y+rotation[1],source.rotation.z);
        }});
    }


    constructor(container) {
        super(container, new Vector3(-69.72941536822103, -0.014040171664235102, 0), new Vector3(0, 0, 0));

        container.append(this.renderer.domElement);

        createLights(this.scene);

        initRapier();

        this.setupWalls(this.scene);

        this.sphere = createSphere(0.2, 32,32, [-65.72941536822103, -0.014040171664235102, 0]);


            
        controls = this.getControls('ball',{
            camera: this.camera,
            ball: createCollidingSphere(this.sphere, true, ballAdditionalMass),
            speed:ballSpeed,
            onlyOneThrow:true,
        
        });

        setupGUI(controls);

        this.scene.add(this.sphere);

        this.loop = new Loop(this.camera,this.scene,this.renderer, getUpdatePhysics(1), controls.handleInput, ()=>{});
        
        control2 = this.getControls('orbit',{
            camera: this.camera,
            renderer: this.renderer,
        });
        //transformControls = addTransformControls(camera, renderer, this.scene,controls, gaussianPromise);
    }

    async init(){      
        
        
        const bowling = await getBowlingBall(this.scene);

    
        this.sphere.add(bowling);
        
        addBowlingGUILines(this.scene,this.loop,this.sphere,this.camera);
        addBowlingControls(control2,this.sphere,this.loop, this.camera,maximumCameraDistance);

        let gaussian = new GaussianScene(this.camera, this.renderer, this.scene);
        this.gaussianPromise = gaussian.loadBowlingScene(
            this.sphere,
            this, 
            {x:.2,y:.8,z:.2},
            pinRows,
            pinSpacingMultiplier,
            pinsDistanceAdd, 
            pinsAdditionalMass,//additional mass
            pinFriction,
            controls);//friction 
 
        this.gaussianPromise.then((gaussian)=>{
            this.loop.updateGaussians = gaussian.updateGaussians;
        });


        const loader = new EXRLoader();
        const texture = loader.load(
            'evening_road_01_puresky_4k.exr',
            () => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            this.scene.background = texture;
        });
                        
        
        
    }

    resetBowlingScene = () => {
        this.gaussianPromise.then(gaussian=>gaussian.resetBowlingScene());
    }


 

    
    
}

export { PhysicsWorld };
