import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const cardinalExp = /(N|NE|NW|S|SE|SW|E|W)/;

export const cardinalParser = terminal(LNToken.Cardinal, "<cardinal>")
    .map(t => CardinalValue.fromString(t.text))
    .surroundedBy(whitespaceParser.zeroOrMore());

export type Cardinal = 'N' | 'NE' | 'NW' | 'S' | 'SE' | 'SW' | 'E' | 'W';

export class CardinalValue {
    readonly value: Cardinal

    constructor(value: Cardinal) {
        this.value = value;
    }

    static hasType(param: any): boolean {
        return param instanceof CardinalValue;
    }

    static fromString(strValue: string): CardinalValue {
        switch (strValue) {
            case 'N':
            case 'NE':
            case 'NW':
            case 'S':
            case 'SE':
            case 'SW':
            case 'E':
            case 'W':
                return new CardinalValue(strValue);
            default:
                throw new Error(`invalid cardinal value: ${strValue}`);
        }
    }
}
