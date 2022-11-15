import {terminal} from "parzec";

import {LNToken} from "./lexer";
import {Name} from "../ast/Name";

export const nameExp = /[a-z][a-z0-9]*/;

export const nameParser = terminal(LNToken.Name, "<command>")
    .map(t => new Name(t.text));
