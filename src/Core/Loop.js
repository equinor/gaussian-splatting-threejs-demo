import { Clock, Vector3, Quaternion } from 'three';
import { GaussianScene } from '../PhysicsWorld/gaussian.js';

const clock = new Clock();


class Loop{
    updatables = [];
    
    running = false;
    constructor(camera,scene,renderer, updatePhysics, handleInputs, updateGaussians){
        if(!handleInputs){
            console.warn('No input handler provided');
            handleInputs = ()=>{};
        }
        this.inputHandle = handleInputs;
        this.physicsUpdate = updatePhysics;
        this.updateGaussians = updateGaussians;
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
    }

    tick(delta){
        this.inputHandle();
        this.physicsUpdate();
        this.updatables.forEach(element => element.tick(delta));
        this.updateGaussians();
    }
    
    
    start(){
        this.running = true;
        this.renderer.setAnimationLoop(()=>{
            const delta = clock.getDelta();
            this.tick(delta);
            this.renderer.render(this.scene,this.camera);
        });


    }
    stop(){
        this.running = false;
        this.renderer.setAnimationLoop(null);
    }

}

export {Loop};