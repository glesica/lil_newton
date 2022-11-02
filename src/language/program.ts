import {Instruction} from "./instruction";

export class Program {
    readonly commands: Array<Instruction>

    constructor(commands: Array<Instruction>) {
        this.commands = commands;
    }
}
