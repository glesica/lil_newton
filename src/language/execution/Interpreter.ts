import {Turtle} from "../../game/turtle";
import {Program} from "../ast/Program";
import {Instruction} from "../ast/Instruction";
import {Drawing} from "../../game/drawing";
import {parseProgram} from "../parser/parser";
import {Scope} from "./Scope";
import {Enum} from "../ast/Enum";
import {Color} from "excalibur";
import {Num} from "../ast/Num";

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
        for (const instruction of program.instructions) {
            await this.executeInstruction(instruction);
        }
    }

    async executeInstruction(instruction: Instruction) {
        switch (instruction.name.value) {
            case "color":
                this.executeColor(instruction);
                break;
            case "head":
                await this.executeHead(instruction);
                break;
            case "sleep":
                await this.executeSleep(instruction);
                break;
            case "thrust":
                await this.executeThrust(instruction);
                break;
            case "turn":
                await this.executeTurn(instruction);
                break;
            case "wait":
                await this.executeWait(instruction);
                break;
            default:
                throw new Error(`instruction ${instruction.name.value} not found`);
        }
    }

    executeColor(instruction: Instruction) {
        const colorArg = instruction.args[0] as Enum;
        const color = this.scope.lookupEnum(colorArg.value) as Color;

        console.log(`color = ${color} colorArg.value = ${colorArg.value}`);

        this.drawing.setLineColor(color);
    }

    async executeHead(instruction: Instruction) {
        const deltaArg = instruction.args[0] as Num;
        const delta = deltaArg.value - this.turtle.rotationInDegrees;

        await this.turtle.rotateBy(delta);
    }

    async executeSleep(instruction: Instruction) {
        const secondsArg = instruction.args[0] as Num;
        const seconds = secondsArg.value;

        await new Promise((resolve, _reject) => {
            setTimeout(() => {
                resolve();
            }, seconds * 1000);
        });
    }

    async executeThrust(instruction: Instruction) {
        const forceArg = instruction.args[0] as Num;
        const durationArg = instruction.args[1] as Num;

        const force = forceArg.value;
        const duration = durationArg.value;

        await this.turtle.thrust(force, duration);
    }

    async executeTurn(instruction: Instruction) {
        const directionArg = instruction.args[0] as Enum;
        const direction = this.scope.lookupEnum(directionArg.value) as number;

        const deltaArg = instruction.args[1] as Num;
        const delta = deltaArg.value;

        await this.turtle.rotateBy(direction * delta);
    }

    // TODO: This doesn't do anything, but we might want it later to allow async ops
    async executeWait(instruction: Instruction) {
        await Promise.all(this.tasks);
        this.tasks = [];
    }
}

// TODO: Unsure if this will work
function verifyArg<T>(arg: any): T {
    if (arg instanceof T) {
        return arg as T;
    }

    throw Error(`expected ${T} but found ${arg}`);
}
