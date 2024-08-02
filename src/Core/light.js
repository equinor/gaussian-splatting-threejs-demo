import { Light, Color, DirectionalLight, AmbientLight, PointLight } from 'three';




function createLight(position, color){
    let light = new DirectionalLight(color, 10)
    light.position.x = position
    return light;
}

function createAmbientLight(color, intensity=1){
    const light = new AmbientLight( color, intensity ); 
    return light
}

function createPointLight(position, color,intensity){
    const light = new PointLight( color ,intensity);
    light.position.set(position.x, position.y, position.z);
    return light;
}

export function createLights(scene){
    const pointLights = [];
    for(let i = 4; i >= -4; i-= 1.5){
        for(let j = 4; j >= -4; j-= 1.5){
        pointLights.push(createPointLight({x:i,y:1,z:j}, new Color('white'),1));
        }

    }

    let light = createLight(-10, new Color('peachpuff'));
    const ambientLight = createAmbientLight(new Color(0.4,0.4,0.4),1);



    pointLights.forEach((pointLight)=>{
        scene.add(pointLight);
    });
    scene.add(light);
    scene.add(createLight(10,new Color('orchid')))
    scene.add(ambientLight);
}

export {createLight, createAmbientLight, createPointLight}