function generateRock(index) {
    const geometry = new THREE.BufferGeometry();

    const g = (1 + Math.sqrt(5)) / 2; //golden ratio
    
    let v1 = [g, 1, 0];
    let v2 = [g, -1, 0];
    let v3 = [-g, -1, 0];
    let v4 = [-g, 1, 0];
    let v5 = [1, 0, g];
    let v6 = [-1, 0, g];
    let v7 = [-1, 0, -g];
    let v8 = [1, 0, -g];
    let v9 = [0, g, 1];
    let v10 = [0, g, -1];
    let v11 = [0, -g, -1];
    let v12 = [0, -g, 1];
    
    const vertices = new Float32Array( [
        v1[0], v1[1], v1[2],
        v5[0], v5[1], v5[2],
        v9[0], v9[1], v9[2],
    
        v1[0], v1[1], v1[2],
        v2[0], v2[1], v2[2],
        v5[0], v5[1], v5[2],
            
        v1[0], v1[1], v1[2],
        v2[0], v2[1], v2[2],
        v8[0], v8[1], v8[2],
            
        v1[0], v1[1], v1[2],
        v8[0], v8[1], v8[2],
        v10[0], v10[1], v10[2],
            
        v1[0], v1[1], v1[2],
        v9[0], v9[1], v9[2],
        v10[0], v10[1], v10[2],
        
        v3[0], v3[1], v3[2],
        v6[0], v6[1], v6[2],
        v12[0], v12[1], v12[2],
            
        v3[0], v3[1], v3[2],
        v12[0], v12[1], v12[2],
        v11[0], v11[1], v11[2],
            
        v3[0], v3[1], v3[2],
        v11[0], v11[1], v11[2],
        v7[0], v7[1], v7[2],
            
        v3[0], v3[1], v3[2],
        v7[0], v7[1], v7[2],
        v4[0], v4[1], v4[2],
            
        v3[0], v3[1], v3[2],
        v4[0], v4[1], v4[2],
        v6[0], v6[1], v6[2],
            
    
        v11[0], v11[1], v11[2],
        v2[0], v2[1], v2[2],
        v12[0], v12[1], v12[2],
            
        v12[0], v12[1], v12[2],
        v2[0], v2[1], v2[2],
        v5[0], v5[1], v5[2],
            
        v12[0], v12[1], v12[2],
        v5[0], v5[1], v5[2],
        v6[0], v6[1], v6[2],
            
        v5[0], v5[1], v5[2],
        v6[0], v6[1], v6[2],
        v9[0], v9[1], v9[2],
            
        v6[0], v6[1], v6[2],
        v9[0], v9[1], v9[2],
        v4[0], v4[1], v4[2],
            
        v9[0], v9[1], v9[2],
        v4[0], v4[1], v4[2],
        v10[0], v10[1], v10[2],
            
        v4[0], v4[1], v4[2],
        v10[0], v10[1], v10[2],
        v7[0], v7[1], v7[2],
            
        v7[0], v7[1], v7[2],
        v10[0], v10[1], v10[2],
        v8[0], v8[1], v8[2],
            
        v8[0], v8[1], v8[2],
        v7[0], v7[1], v7[2],
        v11[0], v11[1], v11[2],
            
        v11[0], v11[1], v11[2],
        v8[0], v8[1], v8[2],
        v2[0], v2[1], v2[2],
    ] );
    
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    
    const material = new THREE.MeshBasicMaterial( { color: 0x111111,
        fog: true } );
    material.side = THREE.DoubleSide;
    return new THREE.Mesh( geometry, material );
}

export { generateRock }