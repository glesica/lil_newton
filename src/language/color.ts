import {Color} from "excalibur";
import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const colorExp = /(Black|White|Red|Green|Blue)/;

export const colorParser = terminal(LNToken.Color, "<color>")
    .map(t => ColorValue.fromString(t.text))
    .surroundedBy(whitespaceParser.zeroOrMore());

export type LNColor = 'Black' | 'White' | 'Red' | 'Green' | 'Blue';

export class ColorValue {
    readonly value: Color

    constructor(value: Color) {
        this.value = value;
    }

    static fromString(strValue: string): ColorValue {
        return new ColorValue(colorTable[strValue]);
    }
}

export const colorTable: Record<LNColor, Color> = {
    'Black': Color.Black,
    'White': Color.White,
    'Red': Color.Red,
    'Green': Color.Green,
    'Blue': Color.Blue,
};
