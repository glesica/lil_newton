import {Turtle} from "../../game/turtle";
import {Program} from "../ast/Program";
import {Instr} from "../ast/Instr";
import {Drawing} from "../../game/drawing";
import {parseProgram} from "../parser/parser";
import {Scope} from "./Scope";
import {Enum} from "../ast/Enum";
import {Color} from "excalibur";
import {Num} from "../ast/Num";
import {Asmt} from "../ast/Asmt";

export class Interpreter {
    private readonly drawing: Drawing;
    private readonly turtle: Turtle;
    private readonly scope: Scope = new Scope();

    private tasks: Array<Promise<void>> = [];

    constructor(turtle: Turtle, drawing: Drawing) {
        this.turtle = turtle;
        this.drawing = drawing;
    }

    getDrawing(): Drawing {
        return this.drawing;
    }

    async run(program: string) {
        const programTree = parseProgram(program);
        await this.execute(programTree);
    }

    async execute(program: Program) {
        for (const element of program.elements) {
            if (element instanceof Asmt) {
                await this.executeAssignment(element);
            } else if (element instanceof Instr) {
                await this.executeInstruction(element);
            } else {
                console.error(element);
                throw Error(`unknown element: ${element}`);
            }
        }
    }

    async executeAssignment(asmt: Asmt) {
        this.scope.setVar(asmt.name.value, asmt.value);
    }

    // TODO: Now we write code to resolve symbols down to a concrete value
    // The value can then be type-checked

    async executeInstruction(instr: Instr) {
        switch (instr.name.value) {
            case "color":
                this.executeColor(instr);
                break;
            case "head":
                await this.executeHead(instr);
                break;
            case "sleep":
                await this.executeSleep(instr);
                break;
            case "thrust":
                await this.executeThrust(instr);
                break;
            case "turn":
                await this.executeTurn(instr);
                break;
            default:
                throw new Error(`instruction ${instr.name.value} not found`);
        }
    }

    executeColor(instruction: Instr) {
        const colorArg = instruction.args[0] as Enum;
        const color = this.scope.lookupEnum(colorArg.value) as Color;

        this.drawing.setLineColor(color);
    }

    async executeHead(instruction: Instr) {
        const deltaArg = instruction.args[0] as Num;
        const delta = deltaArg.value - this.turtle.rotationInDegrees;

        await this.turtle.rotateBy(delta);
    }

    async executeSleep(instruction: Instr) {
        const secondsArg = instruction.args[0] as Num;
        const seconds = secondsArg.value;

        await new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, seconds * 1000);
        });
    }

    async executeThrust(instruction: Instr) {
        const forceArg = instruction.args[0] as Num;
        const durationArg = instruction.args[1] as Num;

        const force = forceArg.value;
        const duration = durationArg.value;

        await this.turtle.thrust(force, duration);
    }

    async executeTurn(instruction: Instr) {
        const directionArg = instruction.args[0] as Enum;
        const direction = this.scope.lookupEnum(directionArg.value) as number;

        const deltaArg = instruction.args[1] as Num;
        const delta = deltaArg.value;

        await this.turtle.rotateBy(direction * delta);
    }
}

// TODO: Unsure if this will work
function verifyArg<T>(arg: any): T {
    if (arg instanceof T) {
        return arg as T;
    }

    throw Error(`expected ${T} but found ${arg}`);
}
