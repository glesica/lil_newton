import {Engine} from "excalibur";
import {Turtle} from "./turtle";
import {Drawing} from "./drawing";
import {Interpreter} from "./language/interpreter";

export class Simulation {
    game: Engine;
    turtle: Turtle;
    drawing: Drawing;
    interpreter: Interpreter;
    code: string;
    codeElement: HTMLTextAreaElement;
    runButton: HTMLButtonElement;

    constructor() {
        this.game = new Engine({
            width: 640,
            height: 480,
            canvasElementId: "game",
        });
        this.turtle = new Turtle(25);
        this.drawing = new Drawing(this.turtle);
        this.interpreter = new Interpreter(this.turtle, this.drawing);

        this.game.addScene('drawing', this.drawing);
        this.game.goToScene('drawing');

        this.codeElement = document.getElementById("code-box") as HTMLTextAreaElement;
        this.codeElement.onkeyup = (e) => {
            this.updateCode();
        }

        this.runButton = document.getElementById("run-btn") as HTMLButtonElement;
        this.runButton.onclick = (e) => {
            this.updateCode();
            this.interpreter.run(this.code).then(() => {
                this.game.stop();
                console.log('game stopped');
            })
        }

        this.game.start().then(() => {
            console.log('game started');
        });
    }

    updateCode() {
        this.code = this.codeElement.value.trim();
    }
}