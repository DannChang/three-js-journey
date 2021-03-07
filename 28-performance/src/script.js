import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'

/**
 * Tip 1 - Monitor the FPS /w Stats GUI
 * Instantiated here, as well as, in the tick/animate function
 */
const stats = new Stats()
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const displacementTexture = textureLoader.load('/textures/displacementMap.png')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance',
    antialias: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Test meshes
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial()
)
cube.castShadow = true
cube.receiveShadow = true
cube.position.set(- 5, 0, 0)
scene.add(cube)

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
    new THREE.MeshStandardMaterial()
)
torusKnot.castShadow = true
torusKnot.receiveShadow = true
scene.add(torusKnot)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
sphere.position.set(5, 0, 0)
sphere.castShadow = true
sphere.receiveShadow = true
scene.add(sphere)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
)
floor.position.set(0, - 2, 0)
floor.rotation.x = - Math.PI * 0.5
floor.castShadow = true
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, 2.25)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Stats start
    stats.begin()
    
    // Update test mesh
    torusKnot.rotation.y = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    stats.end()
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()

/**
 * Tips
 */

// // Tip 2 - Disable FPS Limit in Terminal (if you have a powerful computer)
// // open -a "Google Chrome" --args --disable-gpu-vsync --disable-frame-rate-limit

// // Tip 3 - Monitor Drawcalls (actions of drawing trangles by the GPU)
// // Monitor draw calls with Spector.js (Chrome extension)

// // Tip 4 - Keep track of # of triangles used for GPU performance
// console.log(renderer.info)

// // Tip 5 - Good JavaScript code
// // Use native JavaScript code to keep performances up

// // Tip 6 - Remove objects when necessary
// scene.remove(cube)
// cube.geometry.dispose()
// cube.material.dispose()

// // Tip 7 - Avoid Lights (if possible)
// // Only use AmbientLight of DirectionalLight if a must

// // Tip 8 - Avoid adding/removing lights
// // The renderer has to be recompiled again and again

/**
 * Shadows
 */

// // Tip 9 - Avoid Shadows 
// // Instead, find alternatives like Baked Shadows

// // Tip 10 - Optimize Shadow Maps (if using shadows)
// directionalLight.shadow.camera.top = 3
// directionalLight.shadow.camera.right = 6
// directionalLight.shadow.camera.left = - 6
// directionalLight.shadow.camera.bottom = - 3
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.mapSize.set(1024, 1024)

// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(cameraHelper)

// // Tip 11 - use CastShadow and ReceiveShadow wisely
// cube.castShadow = true
// cube.receiveShadow = false

// torusKnot.castShadow = true
// torusKnot.receiveShadow = false

// sphere.castShadow = true
// sphere.receiveShadow = false

// floor.castShadow = false
// floor.receiveShadow = true

// // Tip 12 - turn Shadow Autoupdate off, but only update shadow once after update
// renderer.shadowMap.autoUpdate = false
// renderer.shadowMap.needsUpdate = true

/**
 * Textures
 */

// // Tip 13 - Resize Textures
// // Try to reduce the resolution to the minimum

// // Tip 14 - Keep the resolution to a power of 2
// // This is important for mipmaps (pyramids are pre-calulated to optimize sequences of images)

// // Tip 15 - Use the right format
// // Instead of traditional JPG/PNG files, consider .basis files (easier on GPU)

/**
 * Geometries
 */

// // Tip 16 - Use BufferGeometries
// // Non Buffer geometries are bad for performances 

// // Tip 17 - Do not update Vertices
// // We can do it once when creating the geometry, 
// // but avoid doing it in the tick/animate function

// // Tip 18 - Mutualize Geometries
// // If you have multiple Meshes using the same geomtry shape,
// // create only one geometry, and use it on all the meshes.
// for(let i = 0; i < 50; i++)
// {
//     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

//     const material = new THREE.MeshNormalMaterial()
    
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 19 - Merge Geometries
// for(let i = 0; i < 50; i++)
// {
//     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

//     const material = new THREE.MeshNormalMaterial()
    
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

/**
 * Materials
 */

// // Tip 20 - Mutualize materials
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    
// for(let i = 0; i < 50; i++)
// {
//     const material = new THREE.MeshNormalMaterial()

//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 21 - Use cheap materials
// / E.g. MeshBasicMaterial, MeshLambertMaterial, or MeshPhonMaterial

/**
 * Meshes
 */

// // Tip 22 Use InstancesMesh
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const material = new THREE.MeshNormalMaterial()
    
for(let i = 0; i < 50; i++)
{
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10
    mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
    mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

    scene.add(mesh)
}

// // Tip 23 - Low poly
// // The fewer the polygons, the better the frame rate
// // If you need details, use normal maps

// // Tip 24 - Use Draco Compression
// // If the model is complex + detailed, use the Draco compression. 
// // Must load Draco libraries if using

// // Tip 25 - Gzip
// // Gzip is a compressino happening on the server side

/**
 * Cameras
 */

// // Tip 26 - Field of view
// // When objects are not in the FOV, they won't be rendered.
// // Try reducing Camera's FOV for fewer objects, and fewer triangle renders

// // Tip 27 - Near and far
// // Same idea, but adjust the near and far values where reasonable

/**
 * Renderer
 */

// // Tip 29 - Ajdust Pixel Ratio if needed
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// // Tip 30 - Power preferences
// // Some devices may be able to switch between different
// // GPU or different GPU usage. We may specify the powerPreference
// // property in WebGLRenderer:
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     powerPreference: 'high-performance'
// })


// // Tip 31, 32, 34 and 35
// const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

// const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms:
//     {
//         uDisplacementTexture: { value: displacementTexture },
//         uDisplacementStrength: { value: 1.5 }
//     },
//     vertexShader: `
//         uniform sampler2D uDisplacementTexture;
//         uniform float uDisplacementStrength;

//         varying vec2 vUv;

//         void main()
//         {
//             vec4 modelPosition = modelMatrix * vec4(position, 1.0);

//             float elevation = texture2D(uDisplacementTexture, uv).r;
//             if(elevation < 0.5)
//             {
//                 elevation = 0.5;
//             }

//             modelPosition.y += elevation * uDisplacementStrength;

//             gl_Position = projectionMatrix * viewMatrix * modelPosition;

//             vUv = uv;
//         }
//     `,
//     fragmentShader: `
//         uniform sampler2D uDisplacementTexture;

//         varying vec2 vUv;

//         void main()
//         {
//             float elevation = texture2D(uDisplacementTexture, vUv).r;
//             if(elevation < 0.25)
//             {
//                 elevation = 0.25;
//             }

//             vec3 depthColor = vec3(1.0, 0.1, 0.1);
//             vec3 surfaceColor = vec3(0.1, 0.0, 0.5);
//             vec3 finalColor = vec3(0.0);
//             finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
//             finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
//             finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;

//             gl_FragColor = vec4(finalColor, 1.0);
//         }
//     `
// })

// const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
// shaderMesh.rotation.x = - Math.PI * 0.5
// scene.add(shaderMesh)