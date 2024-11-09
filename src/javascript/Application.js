import * as THREE from 'three'
import * as lil from "lil-gui"
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import World from '../world/Index'
import Stats from 'stats.js';

export default class Application {

    constructor(_options) {

        // options
        this.$canvas = _options.$canvas

        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild(this.stats.dom)


        // FPS tracking variables
        this.fps = 0;
        this.frames = 0;
        this.lastTime = performance.now();


        this.time = new Time()
        this.sizes = new Sizes()

        this.setConfig()
        this.setDebug()
        this.setRenderer()
        this.setCamera()
        this.setWorld()
        this.render()
    }

    /**
     * Set config
     */
    setConfig() {
        this.config = {}
        this.config.debug = window.location.hash === '#debug'
    }


    /**
    * Set debug
    */
    setDebug() {
        this.debug = new lil.GUI({ width: 420, })
    }


    /**
    * Set renderer
    */
    setRenderer() {
        // Scene
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color("#000009")

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.$canvas,
            alpha: true
        })

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)


        this.sizes.on("resize", () => {
            this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
        })

    }


    /**
    * Set camera
    */
    setCamera() {
        this.camera = new Camera({
            time: this.time,
            sizes: this.sizes,
            renderer: this.renderer,
            debug: this.debug,
            config: this.config
        })

        this.scene.add(this.camera.container)
    }

    /**
     * Set world
     */
    setWorld() {
        this.world = new World({
            config: this.config,
            debug: this.debug,
            time: this.time,
            sizes: this.sizes,
            camera: this.camera,
            scene: this.scene,
            renderer: this.renderer,
        })

        this.scene.add(this.world.container)
    }

    render() {

        this.time.on('tick', () => {
            this.stats.begin(); // Start FPS tracking

            const elapsed = this.time.elapsed;               
            this.world.update(elapsed)
            this.renderer?.render(this.scene, this.camera?.instance)

            this.stats.end(); // End FPS tracking
        })
    }

    /**
    * Destructor
    */
    destructor() {
        this.time.off('tick')
        this.sizes.off('resize')

        this.camera.orbitControls.dispose()
        this.renderer.dispose()
        this.debug.destroy()
    }
}