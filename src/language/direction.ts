import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const directionExp = /(Left|Right)/;

export const directionParser = terminal(LNToken.Direction, "<direction>")
    .map(t => t.text as Direction)
    .surroundedBy(whitespaceParser.zeroOrMore());

export type Direction = 'Left' | 'Right';
