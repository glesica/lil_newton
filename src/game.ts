import {Engine, Physics, vec} from 'excalibur';

import {Turtle} from "./turtle";
import {Drawing} from "./drawing";
import {Interpreter} from "./language/interpreter";

// Physics.useRealisticPhysics();

let code = "";

const turtle = new Turtle(25);
const drawing = new Drawing(turtle);
const interpreter = new Interpreter(turtle, drawing);

const codeArea = document.getElementById("code-box") as HTMLTextAreaElement;
codeArea.onkeyup = (e) => {
    const area = e.target as HTMLTextAreaElement;
    code = area.value;
    console.log(code);
}

const runButton = document.getElementById("run-btn") as HTMLButtonElement;
runButton.onclick = (e) => {
    interpreter.run(code);
}

const game = new Engine({
    width: 640,
    height: 480,
    canvasElementId: "game",
});

game.addScene('drawing', drawing);
game.goToScene('drawing');

game.start().then(() => {
    setTimeout(() => {
        game.stop();
    }, 10000)
});
