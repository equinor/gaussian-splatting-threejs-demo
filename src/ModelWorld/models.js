import { AnimationMixer, Object3D, AnimationClip } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { add, mod } from "three/examples/jsm/nodes/Nodes.js";

function setupModel(data) {
    const model = data.scene.children[0];
    const parent = new Object3D();
    parent.add(model);
    const clip = data.animations[0];
  
    const mixer = new AnimationMixer(model);

    const action = mixer.clipAction(clip);
    model.position.z =200;

    action.play();
    model.rotation.y = Math.PI/2;
    parent.tick = (delta) => {
        mixer.update(delta);
        parent.rotation.y+=0.01;
    }
    return parent;
}

const addModel = (modelData, scene) =>{
    const model = setupModel(modelData);
    model.scale.set(0.01,0.01,0.01);
    scene.add(model);
    return model;
}

export const addModels = async (scene)=>{
    const loader = new GLTFLoader();
    const paths = ['Flamingo.glb', 'Parrot.glb', 'Horse.glb'];
    const modelsData = await Promise.all(
        ['Flamingo.glb', 'Parrot.glb', 'Horse.glb'].map((url) => loader.loadAsync(url))
    );


    
    const models = modelsData.map((modelData) => addModel(modelData, scene));
    models.forEach((model,i)=>{
        model.name = paths[i];
    });
    models[2].position.set(0, -1.7, 0);
    models[2].children[0].scale.multiplyScalar(0.5);
    models[2].rotation.y-=Math.PI*1.5;

    models[1].position.y+=.5;

    models[1].rotation.y-=Math.PI*.75;

    return models;
}