import {Turtle} from "../turtle";
import {Program} from "./program";
import {Instruction} from "./instruction";
import {Drawing} from "../drawing";
import {parseProgram} from "./parser";
import {NumberValue} from "./number";
import {DirectionValue} from "./direction";

export class Interpreter {
    private readonly drawing: Drawing;
    private readonly turtle: Turtle;

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
        switch (instruction.name) {
            case "color":
                this.executeColor(instruction);
                break;
            case "head":
                await this.executeHead(instruction);
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
                throw new Error(`instruction ${instruction.name} not found`);
        }
    }

    // Some kind of generic-ish validator so we can declare a spec
    // for a command, then have it automatically handled, at least
    // partially.
    //
    // On the other hand, maybe each handler function just validates
    // its own command, and we provide a couple utilities to make the
    // error messages consistent and helpful.

    // Need separate types for the various instructions so that we
    // can do a type switch? Unsure. Then the parser would need to
    // construct them? Or would we do that in the main execute()
    // method before passing them to the specific methods? The specific
    // instruction types could hard-code their names so that the type
    // switch would be easy, but then how do we construct the
    // correct one in the parser?

    executeColor(instruction: Instruction) {
        // Can't get this one to work for some reason, causes Chrome
        // to hang. It's weird.
        //
        // verifyArgCount(instruction, 1);
        // console.log(instruction.args[0]);
        // if (! (instruction.args[0] instanceof ColorValue)) {
        //     throw new Error("expected parameter 1 to be a color");
        // }

        // const colorValue = instruction.args[0] as ColorValue;
        // this.drawing.setLineColor(colorValue.value);
    }

    async executeHead(instruction: Instruction) {
        verifyArgs(instruction, [NumberValue.hasType]);

        const delta = (instruction.args[0] as NumberValue).value - this.turtle.rotation;
        this.turtle.rotateBy(delta);
    }

    async executeThrust(instruction: Instruction) {
        verifyArgs(instruction, [NumberValue.hasType, NumberValue.hasType]);

        const force = (instruction.args[0] as NumberValue).value;
        const duration = (instruction.args[1] as NumberValue).value;

        await this.turtle.thrust(force, duration);
    }

    async executeTurn(instruction: Instruction) {
        verifyArgs(instruction, [DirectionValue.hasType, NumberValue.hasType]);
    }

    async executeWait(instruction: Instruction) {
        verifyArgs(instruction, []);
        await Promise.all(this.tasks);
        this.tasks = [];
    }
}

function verifyArgs(instruction: Instruction, expected: Array<(t: any) => boolean>) {
    const actual = instruction.args;
    if (actual.length !== expected.length) {
        throw new Error(`expected ${expected.length} arguments but got ${actual.length}: ${instruction.args}`);
    }

    for (let i = 0; i < actual.length; i++) {
        const param = actual[i];
        const check = expected[i];
        if (!check(param)) {
            throw new Error(`incorrect type for parameter ${i+1}`);
        }
    }
}
