import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const numberExp = /-?[0-9]+(\.[0-9]+)?/;

export const numberParser = terminal(LNToken.Number, "<number>")
    .map(t => NumberValue.fromString(t.text))
    .surroundedBy(whitespaceParser.zeroOrMore());

export class NumberValue {
    readonly value: number

    constructor(value: number) {
        this.value = value;
    }

    static hasType(param: any): boolean {
        return param instanceof NumberValue;
    }

    static fromString(strValue: string): NumberValue {
        const value = parseFloat(strValue);
        return new NumberValue(value);
    }
}
