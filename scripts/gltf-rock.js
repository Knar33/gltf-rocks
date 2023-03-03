import { noise } from "./perlin3d.js";

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
    const triangleCount = triangles.length;
    for (let triangle = 0; triangle < triangleCount; triangle++) {
        //endpoints
        let v1 = triangles[triangle][0];
        let v2 = triangles[triangle][1];
        let v3 = triangles[triangle][2];
 
        //midpoints
        let v12 = [(v1[0] + v2[0]), (v1[1] + v2[1]), (v1[2] + v2[2])];
        let v13 = [(v1[0] + v3[0]), (v1[1] + v3[1]), (v1[2] + v3[2])];
        let v23 = [(v2[0] + v3[0]), (v2[1] + v3[1]), (v2[2] + v3[2])];
        
        //new triangles
        triangles[triangle] = [v12, v13, v23];
        triangles.push([v1, v13, v12]);
        triangles.push([v2, v12, v23]);
        triangles.push([v3, v13, v23]);
    }
    
    //for each vertex, offset by 3d perlin noise value
    for (let triangle = 0; triangle < triangles.length; triangle++) {
        for (let vertex = 0; vertex < 3; vertex++) {
            //normalize vertex
            var normalizedVector = normalizeVector(triangles[triangle][vertex]);
            //grab perlin noise value for vertex position - I add the index multiplied by 10 to the x component to get a new mesh for each index
            var vertexNoise = noise(normalizedVector[0] + (index * 10), normalizedVector[1], normalizedVector[2]);
            //add perlin noise to vertex offset
            var noisedVertex = [normalizedVector[0] * (1 + vertexNoise), normalizedVector[1] * (1 + vertexNoise),normalizedVector[2] * (1 + vertexNoise)];
            triangles[triangle][vertex] = noisedVertex;
        }
    }

    //generate mesh (noise could happen here to be more efficient but this better represents the final design)
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
    
    var matColor = index % 15 == 0 ? 0xd4af37 : (index +  index * 30);
    const material = new THREE.MeshBasicMaterial( { color: matColor,
        fog: true } );
    material.side = THREE.DoubleSide;
    return new THREE.Mesh( geometry, material );
}

function normalizeVector(vector) {
    let x = vector[0];
    let y = vector[1];
    let z = vector[2];

    let length = Math.sqrt((x * x) + (y * y) + (z * z));
    
    return [x/length, y/length, z/length];
}


export { generateRock }