import * as THREE from 'three';
function createSphere(radius, widthSegments, heightSegments, position) {
    let geometry = new THREE.SphereGeometry( radius, widthSegments,heightSegments );
    geometry = new THREE.EdgesGeometry( geometry );
    let material = new THREE.LineBasicMaterial( { color: 0x777777, wireframe: false } );


    let mesh = new THREE.LineSegments( geometry, material );
    mesh.position.set(...position);
    return mesh;

}


export { createSphere };
