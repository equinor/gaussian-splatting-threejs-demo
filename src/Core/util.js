import { Vector3, Quaternion, Euler } from 'three';

const overrideProperties = (object3D,splatObject) =>{

    object3D.splatObject = splatObject;
    splatObject.object3D = object3D;
   
}


function setTransform(object,{position,rotation,scale}){
    if (position)object.position.set( ...position); 
    if (rotation)object.rotation.set( ...rotation); 
    if (scale)object.scale.set( ...scale); 
    console.log(object);
}



export { overrideProperties, setTransform };