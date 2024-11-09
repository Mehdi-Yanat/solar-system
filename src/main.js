import Application from "./javascript/application";

window.application = new Application({
    $canvas: document.querySelector('.canvas'),
    useComposer: true
})