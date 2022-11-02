import {terminal} from "parzec";

import {LNToken} from "./lexer";

export const whitespaceExp = /[\t ]+/;

export const whitespaceParser = terminal(LNToken.Whitespace, "<whitespace>");
