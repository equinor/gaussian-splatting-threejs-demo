import { GaussianScene } from "./gaussian";


/**
 * Loads the lab scene, sets the correct transforms and locks the non editable scenes
 * @returns 
 */

export const addSplats = async (camera, renderer, scene)=>{

 
    let gaussian = await addToScene(camera,renderer,scene);
    gaussian.setupScenes();
    gaussian.lockNonEditableScenes(scene);
    
    setTransforms(gaussian);

    return gaussian;
}









/**
 * Loads the lab scene and adds it to the scene
 * 
 * @returns a promise of the GaussianScene 
 */
export const addToScene = async (camera,renderer,scene)=>{
    let gaussian = new GaussianScene(camera, renderer, scene);
    await gaussian.addScenes({
        'sus':['firefighter/splat.ply',false],
        'dog1':['bolosleep.ply',false],
        'ole':['ole/splat.ply',false],
        'ole1':['ole/splat.ply',false],
        'ole2':['ole/splat.ply',false],
        'room':['room.ply',false],
        'panel1':['paneltrue/splat.ply',false],
        'panel2':['paneltrue/splat.ply',false],
        'panel3':['paneltrue/splat.ply',false],
        'panel4':['paneltrue/splat.ply',false],
        'luigi':['luigi.ply',false],
        'windmill':['windmill/splat.ply',false],
        'door': ['door/splat.ply',false]
    });
    return gaussian;
}


export const setTransforms = (gaussian) => {
    gaussian.setTransforms({
        'room':{position:[0, -0.6299992852159217, 0], rotation:[3.141592653589793, 0, 0], scale:[3, 3, 3]},
        'dog1':{position:[3.393262435007768, -1.3574467712405145, 0.7746348759431291], rotation:[2.680858100387733, -0.8926344510404622, -0.3961322272367959], scale:[0.06094820327101611, 0.06094820327101611, 0.06094820327101611]},
        'sus':{position:[-4.700351067182168, -1.9074254014061771, -3.5854838521377372], rotation:[-0.027310012234739188, 0.14228099383100953, 3.140169321431668], scale:[1.706073244211508, 1.681484871456083, 1.681484871456083]},
        'panel1':{position:[1.7336504126832986, -1.2473320192539474, -3.3168638285418823], rotation:[3.1199503048191337, -0.07237069893848164, 0.019390233467481862], scale:[2.449679857441738, 2.1200320507286396, 2.1200320507286396]},
        'panel2':{position:[0.3952677964719663, -1.2473320192539474, -3.5382249174928346], rotation:[3.1182346826023064, 0.3920246264193419, 0.029880919685326895], scale:[2.449679857441738, 2.1200320507286396, 2.1200320507286396]},
        'panel3':{position:[-0.5763853031291365, -1.2473320192539474, -3.5382249174928346], rotation:[3.1188281605586403, -0.32319457003009544, 0.01372431582560853], scale:[2.449679857441738, 2.1200320507286396, 2.1200320507286396]},
        'panel4':{position:[1.1261360143111394, -1.2473320192539474, -3.300493695229141], rotation:[0.19765714515255897, 1.2558087302203529, 2.961830972366149], scale:[2.449679857441738, 2.1200320507286396, 2.1200320507286396]},
        'luigi':{position:[4.03237121517925, -1.8785933355112767, 0.8361801379331972], rotation:[3.058068727364984, 1.456406420526434, 0.09477910786395016], scale:[1.3460134161217299, 1.1648834741486953, 1.164883474148695]},
        'ole':{position:[1000,1000,1000]},
        'ole1':{position:[1000,1000,1000]},
        'ole2':{position:[1000,1000,1000]},
        'windmill':{position:[-2.533930629209216, -1.9809450677213183, 3.0731546997005625], rotation:[3.1143414959318036, 0.9156448120132176, 0.0216109444228961], scale:[5.720980695694525, 5.720980695694525, 5.720980695694525]},
        'door':{position:[2.382159425069853, -1.2745681319451834, -2.8988605702814745], rotation:[0.2017879113815533, -1.471178438599485, -2.940778415241004], scale:[2.109761954916993, 2.109761954916993, 2.109761954916993]},
    
    });
}