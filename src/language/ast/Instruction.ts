import {Enum} from "./Enum";
import {Name} from "./Name";
import {Num} from "./Num";

export class Instruction {
    readonly name: Name
    readonly args: Array<Enum|Name|Num>

    constructor(name: Name, args: Array<Enum|Name|Num>) {
        this.name = name;
        this.args = args;
    }
}
