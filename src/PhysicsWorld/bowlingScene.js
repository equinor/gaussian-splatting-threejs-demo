import { createCuboid } from "../Core/cube";
import { Object3D } from "three";
import { createCollidingCube } from "./Physics";
import { overrideProperties } from "../Core/util";
import * as RAPIER from '@dimforge/rapier3d';
import * as THREE from 'three';
import { randFloat } from "three/src/math/MathUtils.js";
import { GUISetActive } from "./bowlingControls";

export class BowlingScene{

    static splatName = 'ole/splat.ply';
    
    static loadBowlingScene = async (gaussian, sphere,world,pinSize={x:.1,y:.5,z:.1}, rows = 2, spacingMultiplier = .5, x = 0, additionalMass = 0, friction = 0.5, bowlingControls = null)=>{
        this.sphere = sphere;
        this.cubes = [];
        this.rows = rows;
        this.bowlingControls = bowlingControls;
        this.world = world;
        await this.doForEachBowlingPosition(rows, async (i,j,id)=>{
            const cube = createCuboid({x:pinSize.x,y:pinSize.y,z:pinSize.z}, 'white', [i*spacingMultiplier + x,-1.5,(j-i/2)*spacingMultiplier], [Math.PI, 0, 0], true);
            cube.collider = createCollidingCube(cube,true,friction,additionalMass);
            this.cubes.push(cube);
            world.scene.add(cube);
            await gaussian.addScene(this.splatName, `ole${id}`);
        });
    
        gaussian.viewer.start();
    

        await this.doForEachBowlingPosition(rows, async (i,j,id)=>{
            let cube = this.cubes[id];
            const ole = gaussian.getScene(`ole${id}`);
            const object3D = new Object3D();
            cube.add(object3D);
            object3D.scale.set(2,2,2);
            object3D.position.set(0,pinSize.y/2,0);
            object3D.rotation.set(0,randFloat(-Math.PI*2,Math.PI*2),0);
            overrideProperties(object3D, ole);
        });
        return gaussian;
    }

    static async doForEachBowlingPosition(rows, callback){
        let id = 0;
        for(let i = 1; i<=rows; i++){
            for(let j = 1; j<=i; j++){
                await callback(i,j,id++);
            }
        }
    }

    static resetBowlingScene = ()=>{
        this.bowlingControls.awake = false;
        this.sphere.collider.rb.setTranslation(new RAPIER.Vector3(-65,0,0));
        this.sphere.collider.rb.setLinvel(new RAPIER.Vector3(0,0,0));
        this.sphere.collider.rb.setAngvel(new RAPIER.Vector3(0,0,0));
            this.doForEachBowlingPosition(this.rows, async (i,j,id)=>{
                let cube = this.cubes[id];
                cube.collider.rb.setLinvel(new RAPIER.Vector3(0,0,0));
                cube.collider.rb.setAngvel(new RAPIER.Vector3(0,0,0));
                const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI,0,0));
                cube.collider.rb.setRotation(new RAPIER.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w));
                cube.collider.rb.setTranslation(new RAPIER.Vector3(i/2,-1.5,(j-i/2)/2));
            });
        this.world.camera.position.set(-69.72941536822103, -0.014040171664235102, 0);

    }
}