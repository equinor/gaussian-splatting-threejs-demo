
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import { Vector3, Quaternion } from 'three';

import { createCube } from './cube';

import { overrideProperties } from './util';

export class BaseGaussianScene{
    constructor(camera, renderer, scene){
        this.scenes = 0;
        this.viewer = new GaussianSplats3D.Viewer({
            'camera': camera,
            'renderer': renderer,
            'cameraUp': [0, 1, 0],
            'initialCameraPosition': [0, 0, 0],
            'initialCameraLookAt': [0, 0, 0],
            'dynamicScene': true,
            'useBuiltInControls': false,
        });
        this.viewer.threeScene = scene;
    }

    updateGaussians = () => {
        this.viewer.splatMesh.scenes.forEach(splatObject => {
            splatObject.position = splatObject.object3D.getWorldPosition(new Vector3());
            splatObject.quaternion = splatObject.object3D.getWorldQuaternion(new Quaternion());
            splatObject.scale = splatObject.object3D.getWorldScale(new Vector3());
        });
    }


    getScene(path){
        return this.viewer.splatMesh.scenes[this.indexAndName[path]];
    }

    async addScene(path, name, editable = false){

        await this.viewer.addSplatScene(path);
        this.indexAndName[name ?? path] = this.scenes;
        this.indexAndEditable[this.scenes] = editable;
        console.log(this.indexAndName);
        this.scenes++;
    }

    setupScenes(callback = ()=>{}){
        this.viewer.start();
        this.viewer.splatMesh.scenes.forEach((splatObject, i)=>{
            let object3D = createCube(1, 'white', [0, 0, 0], [0, 0, 0], true);
            object3D.name = this.indexAndName[i]; // <- this is not correct
            this.viewer.threeScene.add(object3D);
            overrideProperties(object3D, splatObject);
        });
        callback();
    }


    setTransform(scene, {position = [0,0,0], rotation=[0,0,0], scale=[1,1,1]} = {}){
        scene.object3D.position.set(...position);
        scene.object3D.rotation.set(...rotation);
        scene.object3D.scale.set(...scale);
    }
    getLastScene = () => this.viewer.getSplatScene(this.scenes-1);

    /**
     * @param {*} names 
     *  object with keys as the name of the scene
     *  and values as the path to the ply file
     *  and whether the scene is editable 
     * 
     * @example {'ole':['path/to/ole.ply', false], 'martin':['path/to/martin.ply', true]}
     */
    async addScenes(names){
        for (const name in names){
            await this.addScene(names[name][0], name, names[name][1]);
        }
    }

    setTransforms = (idAndTransform={'':{}}) => {
        for (const id in idAndTransform){
            const transform = idAndTransform[id];
            this.setTransform(this.getScene(id),transform);
        }
    }


    indexAndEditable = {};
    indexAndName = {}

}