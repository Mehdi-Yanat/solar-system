import * as THREE from 'three'
import Galaxy from './Galaxy'
import Planet from './Planet';

export default class World {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.debug = _options.debug
        this.time = _options.time
        this.sizes = _options.sizes
        this.camera = _options.camera
        this.scene = _options.scene
        this.renderer = _options.renderer

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('world')
            this.debugFolder.open()
        }

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setGalaxy()
        this.setPlanet()
        this.setLight()
    }

    setGalaxy() {
        this.galaxy = new Galaxy({
            debug: this.debug,
            time: this.time
        })
        this.container.add(this.galaxy.container)
    }

    setPlanet() {
        this.planet = new Planet({
            debug: this.debug,
            time: this.time
        })
        this.container.add(this.planet.container)
    }

    setLight() {
        this.light = new THREE.PointLight(0xFDB813, 50, 10)
        this.light.position.set(0, 0, 0)
        this.container.add(this.light)
    }

    update(elapsed) {
        this.galaxy.update(elapsed);
        this.planet.update(elapsed);
    }
}