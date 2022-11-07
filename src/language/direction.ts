import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const directionExp = /(Left|Right)/;

export const directionParser = terminal(LNToken.Direction, "<direction>")
    .map(t => DirectionValue.fromString(t.text))
    .surroundedBy(whitespaceParser.zeroOrMore());

export type Direction = 'Left' | 'Right';

export class DirectionValue {
    readonly value: Direction

    constructor(value: Direction) {
        this.value = value;
    }

    static hasType(param: any): boolean {
        return param instanceof DirectionValue;
    }

    static fromString(strValue: string): DirectionValue {
        switch (strValue) {
            case 'Left':
            case 'Right':
                return new DirectionValue(strValue);
            default:
                throw new Error(`invalid direction value ${strValue}`);
        }
    }
}
