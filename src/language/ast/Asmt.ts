import {Enum} from "./Enum";
import {Name} from "./Name";
import {Num} from "./Num";

export class Asmt {
    readonly name: Name;
    readonly value: Enum | Name | Num;

    constructor(name: Name, value: Enum | Name | Num) {
        this.name = name;
        this.value = value;
    }
}