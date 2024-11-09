import Application from "./javascript/Application";

window.application = new Application({
    $canvas: document.querySelector('.canvas'),
    useComposer: true
})