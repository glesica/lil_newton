import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {whitespaceParser} from "./whitespace";

export const commandExp = /[a-z]+/;

export const commandParser = terminal(LNToken.Command, "<command>")
    .map(t => t.text as Command)
    .surroundedBy(whitespaceParser.zeroOrMore());

export type Command = string;
