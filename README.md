# three-js-journey
This is a personal documentation from the learning modules by Bruno Simon.

## Part 1: First Scene
Setting up our first object will require 4 elements:
1) Scene - is the place to set up our objects, camera, lighting, etc. 
2) Mesh - is a triangular representation of the objects we create. 
3) Camera - Point of view where you will be seeing.the object.
4) Renderer - Renders the output of our scene and camera.

## Part 2: Webpack
Webpack will be the main bundler to manage the codebase of THREEjs

## Part 3: Transform objects
In order to move an object, we must first transform the object.

There are 4 ways to transform objects in THREEjs:
1) Position
2) Scale
3) Rotation
4) Quaternion 

### 1) Position
Transforming an object could mean for example, translating it to a different position.

    mesh.position.x = 1
    mesh.position.y = 1
    mesh.position.z = 1

A position change on the x-axis will move the object right or left. The y-axis will move either up or down and the z-axis will move the camera forward or back.

An easier way to set those parameters would be to call this:

    mesh.position.set(1, 1, 1)
    // same as the code above

### 2) Scale
To scale an object, the idea of manipulating variables is the same as transforming the position of an object.

What's different is that we are altering the dimensions (ie. scale) of the object.

    mesh.scale.set(2, 0.5, 0.5)
    // sets object to look like a rectangle


### 3) Rotation
Rotating is a bit different. To rotate an object, we must give the parameter values a radian value (Math.PI). 

    mesh.rotation.set((Math.PI * 0.25), Math.PI, Math.PI)

### 4) Quaternion


### Grouping objects
Its purpose is to make working with groups of objects syntactically clearer:

    const group = new THREE.Group()
    group.add( cubeA )
    group.add( cubeB )

    scene.add(group)

To simplify object creation, we can build the objects directly as part of the Mesh parameter as such:

    const cubeA = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1),
        new THREE.MeshBasicMaterial( color: '0xff0000')
    );

We may follow the above formatting to create more instances of the an object and group them together to configure its position, scale, rotation, and quaternion. 

## Part 5: Animating an object
