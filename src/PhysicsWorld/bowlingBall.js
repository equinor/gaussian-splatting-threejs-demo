import { AnimationMixer, Object3D, AnimationClip } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const addModel = (modelData, scene) =>{
    const scale = 3;
    const model = modelData.scene;
    console.log(model);
    model.scale.set(scale,scale,scale);
    scene.add(model);
    return model;
}

export const getBowlingBall = async (scene)=>{
    const loader = new GLTFLoader();

    const modelData = await loader.loadAsync('BowlingBall.glb');


    
    const model = addModel(modelData, scene);

    return model;
}