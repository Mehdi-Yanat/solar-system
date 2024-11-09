import * as THREE from 'three'
import StarsVertex from '../shaders/stars/vertex.glsl'
import StarsFragment from '../shaders/stars/fragment.glsl'


export default class Galaxy {
    constructor(_options) {

        // Options
        this.debug = _options.debug

        // Container
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.vertices = []
        this.material = new THREE.ShaderMaterial({
            vertexShader: StarsVertex,
            fragmentShader: StarsFragment,
            uniforms: {
                uTime: {
                    value: 0.0
                },
                uSpeed: {
                    value: 0.000001
                }
            },
            transparent: true,
            blending: THREE.AdditiveBlending
        })

        for (let i = 0; i < 10000; i++) {
            const x = THREE.MathUtils.randFloatSpread(50);
            const y = THREE.MathUtils.randFloatSpread(50);
            const z = THREE.MathUtils.randFloatSpread(50);

            this.vertices.push(x, y, z);
        }

        // Geometry
        this.geometry = new THREE.BufferGeometry()

        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3))
        this.points = new THREE.Points(this.geometry, this.material);
        this.points.updateMatrix();
        this.container.add(this.points);

        this.debug.add(this.material.uniforms.uSpeed, 'value').min(0.000001).max(1).step(0.000001)
    }

    update(elapsed) {
        this.material.uniforms.uTime.value = elapsed;
    }
}