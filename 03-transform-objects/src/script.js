import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

 // Create a new group of objects
const group = new THREE.Group()
group.scale.y = 0.5

// Directly instantiate the Mesh with the geometry and material as parameters
const cubeA = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 0x00ff00 })
    )
cubeA.position.set(2, 0, 0)
group.add(cubeA)

const cubeB = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 0xff0000 })
    )
cubeB.position.set(-2, 0, 0)
group.add(cubeB)

const cubeC = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 0x44DDFF })
    )
cubeC.position.set(0, 0, 0)
group.add(cubeC)

scene.add(group)

// Axes helper to help visualize the scale of an object
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper)



/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)



// console.log(mesh.position.distanceTo(camera.position));
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)