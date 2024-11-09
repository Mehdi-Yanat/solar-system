import * as THREE from 'three'
import SunVertex from '../Shaders/sun/vertex.glsl'
import SunFragment from '../Shaders/sun/fragment.glsl'


export default class Planet {
    constructor(_options) {

        // Options
        this.debug = _options.debug
        this.time = _options.time


        // Container
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setSun()
    }

    setSun() {
        // Geometry
        this.geometry = new THREE.SphereGeometry(0.5, 30, 30)

        // Material
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xFDB813) },
                uTime: { value: 0 }
            },
            vertexShader: SunVertex,
            fragmentShader: SunFragment,
        });

        // Mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.container.add(this.mesh)
    }

    update(elapsed) {
        this.material.uniforms.uTime.value = elapsed * 0.01
    }
}