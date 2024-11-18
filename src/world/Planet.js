import * as THREE from 'three';
import SunVertex from '../shaders/sun/vertex.glsl';
import SunFragment from '../shaders/sun/fragment.glsl';

export default class Planet {
    constructor(_options) {
        // Options
        this.debug = _options.debug;
        this.time = _options.time;
        this.texture = new THREE.TextureLoader();
        this.geometry = new THREE.SphereGeometry(0.5, 30, 30);

        // Container
        this.container = new THREE.Object3D();

        this.setSun();
        this.setMercury();
        this.setVenus();
        this.setEarth();
        this.setMars();
        this.setJupiter();
        this.setSaturn();
        this.setUranus();
        this.setNeptune();
        this.setPluto();
    }

    setSun() {
        // Material
        this.materialSun = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xFDB813) },
                uTime: { value: 0 },
            },
            vertexShader: SunVertex,
            fragmentShader: SunFragment,
        });

        // Mesh
        this.sun = new THREE.Mesh(this.geometry, this.materialSun);
        this.container.add(this.sun);
    }

    setPlanet(name, texturePath, scale, distance) {
        const texture = this.texture.load(texturePath);
        texture.mapping = THREE.UVMapping;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        // Material
        const material = new THREE.MeshStandardMaterial({ map: texture });

        // Mesh
        const planetMesh = new THREE.Mesh(this.geometry, material);
        planetMesh.scale.set(scale, scale, scale);
        planetMesh.position.set(distance, 0, 0);

        // Create a pivot for the planet's orbit
        const planetPivot = new THREE.Object3D();
        planetPivot.add(planetMesh);

        this.container.add(planetPivot);

        // Save references for updating
        this[`${name}Mesh`] = planetMesh;
        this[`${name}Pivot`] = planetPivot;
    }

    setMercury() {
        this.setPlanet('mercury', '/textures/mercurymap.jpg', 0.3, 1.5);
    }

    setVenus() {
        this.setPlanet('venus', '/textures/venusmap.jpg', 0.5, 2.5);
    }

    setEarth() {
        this.setPlanet('earth', '/textures/earthmap1k.jpg', 0.5, 3.5);
    }

    setMars() {
        this.setPlanet('mars', '/textures/mars_1k_color.jpg', 0.4, 4.5);
    }

    setJupiter() {
        this.setPlanet('jupiter', '/textures/jupitermap.jpg', 1.0, 6.0);
    }

    setSaturn() {
        this.setPlanet('saturn', '/textures/saturnmap.jpg', 0.9, 8.0);
    }

    setUranus() {
        this.setPlanet('uranus', '/textures/uranusmap.jpg', 0.7, 10.0);
    }

    setNeptune() {
        this.setPlanet('neptune', '/textures/neptunemap.jpg', 0.6, 12.0);
    }

    setPluto() {
        this.setPlanet('pluto', '/textures/plutomap.jpg', 0.2, 14.0);
    }

    update(elapsed) {
        const timeScale = 0.1; // Adjust speed of the simulation

        // Orbital and rotational speeds
        const speeds = {
            mercury: { orbit: 0.05, rotation: 0.0005 },
            venus: { orbit: 0.03, rotation: 0.00002 },
            earth: { orbit: 0.02, rotation: 0.001 },
            mars: { orbit: 0.01, rotation: 0.000095 },
            jupiter: { orbit: 0.005, rotation: 0.0002 },
            saturn: { orbit: 0.002, rotation: 0.0001 },
            uranus: { orbit: 0.005, rotation: 0.00005 },
            neptune: { orbit: 0.04, rotation: 0.00003 },
            pluto: { orbit: 0.02, rotation: 0.00001 },
        };

        // Rotate the Sun
        this.materialSun.uniforms.uTime.value = elapsed * 0.01;
        this.sun.rotation.y = elapsed * 0.0001;

        // Update planets
        Object.keys(speeds).forEach((planet) => {
            const { orbit, rotation } = speeds[planet];
            const planetMesh = this[`${planet}Mesh`];
            const planetPivot = this[`${planet}Pivot`];

            if (planetMesh && planetPivot) {
                // Rotate planet on its axis
                planetMesh.rotation.y += rotation;

                // Rotate planet around the Sun
                planetPivot.rotation.y += orbit * timeScale;
            }
        });
    }
}
