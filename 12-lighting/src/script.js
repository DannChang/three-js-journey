import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

 // Ambient lighting - omnipresence lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

//Equavalent code to above:
 
// const ambientLight = new THREE.AmbientLight()
// ambientLight.color = new THREE.Color(0xffffff)
// ambientLight.intensity = 0.5
// scene.add(ambientLight)
gui
    .add(ambientLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('ambient light intensity')


// Directional Lighting -  Rays travelling in parallel (default: above)
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
scene.add(directionalLight)
    // position rays to middle
directionalLight.position.set(1, 0.25, 0)

// HemisphereLight - similar to AmbientLight but different color from the sky
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)
gui
    .add(hemisphereLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('hemisphere light intensity')

// Point light - lights like a lighter; 
// small light source, and spreads uniformly in every direction
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
scene.add(pointLight)
//position light like any object:
pointLight.position.set(1, - 0.5, 1)

gui
    .add(pointLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .name('point light intensity')
gui
    .add(pointLight, 'distance')
    .min(0)
    .max(10)
    .step(0.1)
    .name('point light distance')
gui
    .add(pointLight, 'decay')
    .min(0)
    .max(5)
    .step(0.01)
    .name('point light decay')

// RectAreaLight - works like the rectangle light stands you see in photoshoots
// A mix between a directional light and a diffuse light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)

rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())

gui
    .add(rectAreaLight, 'intensity')
    .min(0)
    .max(5)
    .step(0.01)
    .name('rect intensity')

gui
    .add(rectAreaLight, 'width')
    .min(0)
    .max(5)
    .step(0.01)
    .name('rect width')

gui
    .add(rectAreaLight, 'height')
    .min(0)
    .max(5)
    .step(0.01)
    .name('rect height')


// SpotLight - works like a flashlight
// parameters: color, intensity, distance, angle, penumbra, decay
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

// moving position of SpotLight to the left of x-axis
spotLight.target.position.x = - 0.75
scene.add(spotLight.target)

gui
    .add(spotLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.0001)
    .name('spotlight intensity')
gui
    .add(spotLight, 'distance')
    .min(0)
    .max(100)
    .step(1)
    .name('spotlight distance')
gui
    .add(spotLight, 'angle')
    .min(0)
    .max(Math.PI)
    .step(Math.PI*0.0001)
    .name('spotlight angle')
gui
    .add(spotLight, 'penumbra')
    .min(0)
    .max(1)
    .step(0.001)
    .name('spotlight penumbra')
gui
    .add(spotLight, 'decay')
    .min(0)
    .max(5)
    .step(0.01)
    .name('spotlight decay')


/**
 * Helper functions are only available for:
 *  */    
//  HemisphereLightHelper
//  DirectionalLightHelper
//  PointLightHelper
//  RectAreaLightHelper ** must import from 'examples' dependency
//  SpotLightHelper ** must update window after each adjustment
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)
window.requestAnimationFrame(() =>
{
    rectAreaLightHelper.position.copy(rectAreaLight.position)
    rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion)
    rectAreaLightHelper.update()
}) // must also be used to update the frames properly

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
scene.add(spotLightHelper)
window.requestAnimationFrame(() =>
{
    spotLightHelper.update()
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()