import {Instr} from "./Instr";
import {Asmt} from "./Asmt";

export class Program {
    readonly elements: Array<Asmt | Instr>

    constructor(elements: Array<Asmt | Instr>) {
        this.elements = elements;
    }
}
