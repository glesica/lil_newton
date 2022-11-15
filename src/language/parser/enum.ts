import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {Enum} from "../ast/Enum";

export const enumExp = /[A-Z][A-Za-z0-9]*/;

export const enumParser = terminal(LNToken.Enum, "<enum>")
    .map(t => new Enum(t.text));
