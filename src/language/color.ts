import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const colorExp = /(Black|White|Red|Green|Blue)/;

export const colorParser = terminal(LNToken.Color, "<color>")
    .map(t => t.text as Color)
    .surroundedBy(whitespaceParser.zeroOrMore());

export type Color = 'Black' | 'White' | 'Red' | 'Green' | 'Blue';
