import {Parameter} from "./parameter";

export class Instruction {
    readonly name: string
    readonly args: Array<Parameter>

    constructor(name: string, args: Array<any>) {
        this.name = name;
        this.args = args;
    }
}
