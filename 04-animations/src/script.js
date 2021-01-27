import './style.css'
import * as THREE from 'three'
// import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

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

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock object (alt to the pure JS Date.now() method)
const clock = new THREE.Clock()

// gsap.to(group.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(group.position, { duration: 1, delay: 2, x: 0 })

// Animations
const tick = () => {

    // Clock / Time stamp
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    group.rotation.x += 0.01
    // group.rotation.y += 0.01
    group.position.y = Math.sin(elapsedTime)
    group.position.x = Math.cos(elapsedTime)
    

    // Renderer
    renderer.render(scene, camera)

    //call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
