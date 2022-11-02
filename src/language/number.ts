import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const numberExp = /-?[0-9](\.[0-9]+)?/;

export const numberParser = terminal(LNToken.Number, "<number>")
    .map(t => parseFloat(t.text))
    .surroundedBy(whitespaceParser.zeroOrMore());
