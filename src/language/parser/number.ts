import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {Num} from "../ast/Num";

export const numberExp = /([0-9]+\.[0-9]*|[0-9]*\.[0-9]+|[0-9]+)/;

export const numberParser = terminal(LNToken.Number, "<number>")
    .map(t => new Num(parseFloat(t.text)));
