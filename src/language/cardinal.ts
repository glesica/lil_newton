import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const cardinalExp = /(N|NE|NW|S|SE|SW|E|W)/;

export const cardinalParser = terminal(LNToken.Cardinal, "<cardinal>")
    .map(t => t.text as Cardinal)
    .surroundedBy(whitespaceParser.zeroOrMore());

export type Cardinal = 'N' | 'NE' | 'NW' | 'S' | 'SE' | 'SW' | 'E' | 'W';
