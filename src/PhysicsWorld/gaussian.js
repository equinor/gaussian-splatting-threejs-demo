import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { Object3D } from 'three';
import { createCube } from '../Core/cube.js';
import { createCuboid } from '../Core/cube.js';
import { createCollidingCube } from './Physics.js';
import * as RAPIER from '@dimforge/rapier3d';
import { overrideProperties } from '../Core/util.js';

import { Vector3, Quaternion } from 'three';
import { whiteboardScene } from './whiteboardSplatScene.js';
import { BaseGaussianScene } from '../Core/gaussian.js';
import { BowlingScene } from './bowlingScene.js';

class GaussianScene extends BaseGaussianScene{

    /**
     * 
     * @param {*} path "path to the ply file" 
     * @param {*} name "name of the scene"
     */
    loadScene = async (path, name)=>{
        await this.addScene(path, name);
        this.setupScenes();
    }


    loadWhiteboardScene = async (sphere,world)=>{
       whiteboardScene(this,sphere,world);
    }

    
    loadBowlingScene = async (sphere,world,pinSize={x:.1,y:.5,z:.1}, rows = 2, spacingMultiplier = .5, x = 0, additionalMass = 0, friction = 0.5, bowlingControls = null)=>{
        return BowlingScene.loadBowlingScene(this,sphere,world,pinSize,rows,spacingMultiplier,x, additionalMass, friction, bowlingControls);
    }
    resetBowlingScene = ()=>{
        BowlingScene.resetBowlingScene();
    }


    

}



export {GaussianScene};
