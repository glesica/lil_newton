import {Instruction} from "./instruction";

export class Program {
    readonly instructions: Array<Instruction>

    constructor(commands: Array<Instruction>) {
        this.instructions = commands;
    }
}
