function generateRock(index) {
    //generate vertices of icosahedron using 3 golden ratio rectangles
    const g = (1 + Math.sqrt(5)) / 2; //golden ratio
    var vertices = [
        [g, 1, 0], [g, -1, 0], [-g, -1, 0], [-g, 1, 0],
        [1, 0, g], [-1, 0, g], [-1, 0, -g], [1, 0, -g],
        [0, g, 1], [0, g, -1], [0, -g, -1], [0, -g, 1]
    ]

    //hard-code triangle array using vertices (or find an elegant way..)
    var triangles = [
        [vertices[0], vertices[4], vertices[8]],
        [vertices[0], vertices[1], vertices[4]],
        [vertices[0], vertices[1], vertices[7]],
        [vertices[0], vertices[7], vertices[9]],
        [vertices[0], vertices[8], vertices[9]],
        [vertices[2], vertices[5], vertices[11]],
        [vertices[2], vertices[11], vertices[10]],
        [vertices[2], vertices[10], vertices[6]],
        [vertices[2], vertices[6], vertices[3]],
        [vertices[2], vertices[3], vertices[5]],
        [vertices[10], vertices[1], vertices[11]],
        [vertices[10], vertices[7], vertices[1]],
        [vertices[11], vertices[1], vertices[4]],
        [vertices[11], vertices[4], vertices[5]],
        [vertices[3], vertices[9], vertices[6]],
        [vertices[4], vertices[5], vertices[8]],
        [vertices[5], vertices[8], vertices[3]],
        [vertices[6], vertices[9], vertices[7]],
        [vertices[8], vertices[3], vertices[9]],
        [vertices[7], vertices[6], vertices[10]]
    ]

    //sub-divide triangles and update vertex/triangle array
    
    //for each vertex, offset by 3d perlin noise value

    //generate mesh

    var geometryVertices = [];
    for (let triangle = 0; triangle < triangles.length; triangle++) {
        for (let vertex = 0; vertex < 3; vertex++) {
            for (let dimension = 0; dimension < 3; dimension++) {
                geometryVertices.push(triangles[triangle][vertex][dimension])
            }
        }
    }

    const geometry = new THREE.BufferGeometry();
    var geometryBuffer = new Float32Array(geometryVertices);
    geometry.setAttribute( 'position', new THREE.BufferAttribute( geometryBuffer, 3 ) );
    
    const material = new THREE.MeshBasicMaterial( { color: 0x111111,
        fog: true } );
    material.side = THREE.DoubleSide;
    return new THREE.Mesh( geometry, material );
}

export { generateRock }