import {Instruction} from "./Instruction";

export class Program {
    readonly instructions: Array<Instruction>

    constructor(commands: Array<Instruction>) {
        this.instructions = commands;
    }
}
