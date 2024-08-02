import * as RAPIER from '@dimforge/rapier3d';


let world;

function createCollidingSphere(mesh, dynamicObject=true, friction=0.5,mass = 5){
    const scaleAverage = mesh.scale.toArray().reduce((a,b)=>a+b,0)/3;
    let position = mesh.position.toArray();
    let quaternion = mesh.quaternion.toArray();
    let shape = mesh.geometry.parameters.radius ?? mesh.geometry.parameters?.geometry?.parameters?.radius ?? 1;
    shape*=scaleAverage;
    let rigidBodyDesc = dynamicObject ? RAPIER.RigidBodyDesc.dynamic().setCcdEnabled(true) : RAPIER.RigidBodyDesc.fixed();
    rigidBodyDesc.setTranslation(...position).setRotation(new RAPIER.Quaternion(...quaternion));
    let rigidBody = world.createRigidBody(rigidBodyDesc);
    rigidBody.setAdditionalMass(mass);
    let colliderDesc = RAPIER.ColliderDesc.ball(shape).setFriction(friction);
    mesh.collider = world.createCollider(colliderDesc, rigidBody);
    mesh.collider._parent.object3d = mesh;
    mesh.collider.rb = mesh.collider._parent;
    return mesh.collider;
}


        
function createCollidingCube(mesh, dynamicObject=true, friction=0.5, additionalMass=0){
    let scale = mesh.scale.toArray();
    let position = mesh.position.toArray();
    let quaternion = mesh.quaternion.toArray();
    let shape = [mesh.geometry.parameters['width']/2*scale[0], mesh.geometry.parameters['height']/2*scale[1], (mesh.geometry.parameters['depth'] ?? .1)/2*scale[2]];
    // Create a dynamic rigid-body.
    let rigidBodyDesc = dynamicObject ? RAPIER.RigidBodyDesc.dynamic().setCcdEnabled(true) : RAPIER.RigidBodyDesc.fixed();

    
    rigidBodyDesc
        .setTranslation(...position)
        .setRotation(new RAPIER.Quaternion(...quaternion));


    
    let rigidBody = world.createRigidBody(rigidBodyDesc);
    rigidBody.setAdditionalMass(additionalMass);

    let colliderDesc = RAPIER.ColliderDesc.cuboid(...shape).setFriction(friction);
    
    mesh.collider = world.createCollider(colliderDesc, rigidBody);
    mesh.collider._parent.object3d = mesh;
    mesh.collider.rb = mesh.collider._parent;
    return mesh.collider;
}

function initRapier() {

    world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 });
    
    return world;
}

let runEveryIterations=3;
let iterations = 0;

export function getUpdatePhysics(interval){
    runEveryIterations = interval;
    return updatePhysics;
}

function updatePhysics() {
    if(iterations++ % runEveryIterations !== 0){
        return
    }
    world.step();

    world.bodies.forEach((body) => {
      if (body.isDynamic()) {
          
          let object3d = body.object3d;
          object3d.position.set(body.translation().x, body.translation().y, body.translation().z);
          object3d.quaternion.set(body.rotation().x, body.rotation().y, body.rotation().z, body.rotation().w);
        }	
      });




}
export { createCollidingCube, createCollidingSphere, initRapier };