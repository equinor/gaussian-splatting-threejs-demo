import { createScene } from "./Core/scene";
import { createRenderer } from "./Core/renderer";
import { createCamera } from "./Core/camera";
import { BallControls } from "./Core/Controls";
import { FPSControls } from "./Core/Controls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Resizer } from "./Core/Resizer";




export class World{
    constructor(container, cameraPosition, cameraLookAt){
        this.scene = createScene();
        this.renderer = createRenderer();
        this.camera = createCamera(cameraPosition, cameraLookAt);
        
        Resizer.listenForResize(container, this.camera, this.renderer);

    }
    getControls = (type, params) => 
        {
            if (type === 'ball') {
                return new BallControls(params);
            }
            if (type === 'fps') {
                return new FPSControls(params);
            }
            if (type === 'orbit') {
                return new OrbitControls(params.camera, params.renderer.domElement);
            }
        }
    init(){
        
    }



    render() {
        this.renderer.render(this.scene, this.camera);
    }


    start(){
        this.loop.start();
    }
    stop(){
        this.loop.stop();
    }


    toggleAnimation(){
        if(this.loop.running){
            this.loop.stop();
        }else{
            this.loop.start();
        }
    }

    cameraPosition = ()=>{
        return this.camera.position;
    }
}