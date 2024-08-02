import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d';
import * as THREE from 'three';
import { Euler, Quaternion, Vector3, Color } from 'three';

import { createCube } from '../Core/cube';

import { overrideProperties } from '../Core/util';
import { BaseGaussianScene } from '../Core/gaussian';



class GaussianScene extends BaseGaussianScene{
    
    

    lockNonEditableScenes(threeScene){
        this.viewer.splatMesh.scenes.forEach((splatObject, i)=>{
            if (!this.indexAndEditable[i]){
                threeScene.remove(splatObject.object3D);
            }
        });
    }
    
}





export {GaussianScene};
