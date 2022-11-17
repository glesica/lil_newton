import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {Enum} from "../ast/Enum";

export const asmtExp = /=/;

export const asmtParser = terminal(LNToken.Enum, "<assignment>")
    .map(t => new Enum(t.text));
