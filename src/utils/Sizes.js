import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor() {
        super();

        this.viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        // Bind resize method
        this.resize = this.resize.bind(this);

        // Listen for resize events
        window.addEventListener("resize", this.resize);

        // Trigger initial resize
        this.resize();
    }

    resize() {
        this.viewport.width = window.innerWidth;
        this.viewport.height = window.innerHeight;

        // Emit resize event
        this.trigger("resize");
    }
}