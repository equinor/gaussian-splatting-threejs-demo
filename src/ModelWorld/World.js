import { createLights } from '../Core/light.js';
import { Color, Object3D, Quaternion, Vector3, Euler } from 'three';
import { Loop } from '../Core/Loop.js';
import { addSplats } from './roomScene.js';
import { addModels } from './models.js';
import { World } from '../World.js';
import { setupRoomWalls } from '../Core/walls.js';
import { addTransformControls } from '../Core/Controls.js';


const controlsType = 'fps';
const enableTransformControls = false;


let controls;
class ModelWorld extends World {

    setupWalls(scene){
        setupRoomWalls(scene);
    }

    constructor(container) {

        super(container, new Vector3(-3.72941536822103, -.75, 0),  new Vector3(0, 0, 0));

        container.append(this.renderer.domElement);

        controls = this.getControls(controlsType, {camera: this.camera, renderer: this.renderer});

        this.loop = new Loop(this.camera,this.scene,this.renderer, ()=>{}, controls.handleInput, ()=>{});
       
        this.setupWalls(this.scene);
        
        createLights(this.scene);

        
    }

    bind3dObjectToGaussian(gaussian,model,gaussianName,yOffset=0){
        const object3D = gaussian.getScene(gaussianName).object3D;
        let time = 0;
        this.loop.updatables.push({tick:(delta)=>{
            const finalPos = model.children[0].getWorldPosition(new Vector3());
            const finalRotation = model.rotation;
            object3D.position.set(finalPos.x, finalPos.y+yOffset+Math.sin(time+=delta*3)*.1, finalPos.z);
            object3D.rotation.set(finalRotation.x, finalRotation.y-1, finalRotation.z+Math.PI);
        }})
        return object3D;
    }
    
    demoObjectsAndScales = {}

    showModelsAndSplatsDemo(demoObjects){
        demoObjects.forEach((demoObject)=>{
            demoObject.scale.set(
                this.demoObjectsAndScales[demoObject.name].x,
                this.demoObjectsAndScales[demoObject.name].y,
                this.demoObjectsAndScales[demoObject.name].z);
        });
    }

    hideModelsAndSplatsDemo(demoObjects){
        demoObjects.forEach((demoObject)=>{
            this.demoObjectsAndScales[demoObject.name] = demoObject.scale.clone();
            demoObject.scale.set(0,0,0);
        });
    }

    loadFirstSplatsDemo(){
        let promise = addSplats(this.camera, this.renderer, this.scene);
        return promise;
    }
    async loadModelsAndSplatsDemo(firstDemo, callback){
        const models = await addModels(this.scene);
        models.forEach(model=> this.loop.updatables.push(model));

        
        const objects = [];
            
    
        const gaussian = await firstDemo;

        

        objects.push(
            this.bind3dObjectToGaussian(gaussian,models[2],'ole',.5),
            this.bind3dObjectToGaussian(gaussian,models[1],'ole1'),
            this.bind3dObjectToGaussian(gaussian,models[0],'ole2')
        );

        if(callback){callback([...models,...objects])};

        return [...models,...objects];
    }

    async init(){
        this.firstDemo = this.loadFirstSplatsDemo();
        
        if(enableTransformControls){
            let controls3 = addTransformControls(this.camera, this.renderer, this.scene, controls, this.firstDemo);
        }

        this.firstDemo.then((gaussian)=>{
            this.loop.updateGaussians = gaussian.updateGaussians;
        });

    }

    
    async loadSecondDemo(){
        this.secondDemoObjects = await this.loadModelsAndSplatsDemo(this.firstDemo);
    }

    showSecondDemo(){
        this.showModelsAndSplatsDemo(this.secondDemoObjects);
    }

    hideSecondDemo(){
        console.log(this.secondDemoObjects)
        this.hideModelsAndSplatsDemo(this.secondDemoObjects);
    }

   
}

export { ModelWorld };
