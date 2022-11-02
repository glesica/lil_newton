import {terminal} from "parzec";

import {LNToken} from "./lexer";

export const newlineExp = /\r?\n/;

export const newlineParser = terminal(LNToken.Newline, "<newline>")
    .oneOrMore();
