console.log(THREE);


// Scenes allow you to set up what and where is to be rendered by three,js
// This is where you place objects, lights, and cameras
const scene = new THREE.Scene();

// A Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// Color declaration (independent of geomtry shape)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// This is a MESH - Class representing TRIANGULAR polygon mesh based objects. 
// Also serves as a base for other classes such as SkinnedMesh.
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); // Always add a scene

// Sizes object
const sizes = {
    width: 800,
    height: 600
}

// Camera (Perspective camera)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);


// Renderer
const canvas = document.querySelector('.webgl'); // 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
// Sets the dimesnion of canvas
renderer.setSize(sizes.width, sizes.height);

// Now we render the cube, but we're inside the cube 
renderer.render(scene, camera);

// So, we have to move the camera position back to be able to see our object (z-axis)