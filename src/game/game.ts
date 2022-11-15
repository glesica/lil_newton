import {Engine} from "excalibur";
import {Turtle} from "./turtle";
import {Drawing} from "./drawing";
import {Interpreter} from "../language/execution/Interpreter";

export class Game {
    engine: Engine;
    turtle: Turtle;
    drawing: Drawing;
    interpreter: Interpreter;
    code: string;

    constructor() {
        this.engine = new Engine({
            width: 640,
            height: 480,
            canvasElementId: "game",
        });

        this.setup();
    }

    changeCode(code: string) {
        if (this.engine.isRunning()) {
            return;
        }
        this.code = code.trim();
    }

    reset() {
        this.engine.stop();
        this.engine.removeScene(this.drawing);
        this.drawing.remove(this.turtle);

        this.setup();
    }

    run() {
        this.engine.start().then(() => {
            this.interpreter.run(this.code).then(() => {
                this.engine.stop();
            });
        });
    }

    setup() {
        this.turtle = new Turtle(25);
        this.drawing = new Drawing(this.turtle);

        this.engine.addScene('drawing', this.drawing);
        this.engine.goToScene('drawing');

        this.interpreter = new Interpreter(this.turtle, this.drawing);

        this.engine.start().then(() => {
            setTimeout(() => {
                this.engine.stop();
            }, 100);
        });
    }
}