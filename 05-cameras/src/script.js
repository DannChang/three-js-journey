import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    // console.log(event.clientX)

    cursor.y = -(event.clientY / sizes.height - 0.5)
    // console.log(event.clientY)
})


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.TorusGeometry( 1, 0.3, 10, 20, Math.PI *2 ),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
// enabels a trailing/accelating/smoothing when cursor moves object
controls.enableDamping = true 
controls.autoRotate = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Update Orbit Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()