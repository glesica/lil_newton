import {Lexer, Token} from "parzec";
import {nameExp} from "./name";
import {whitespaceExp} from "./whitespace";
import {newlineExp} from "./newline";
import {enumExp} from "./enum";
import {numberExp} from "./number";
import {asmtExp} from "./asmt";

export enum LNToken {
    Whitespace,
    Newline,
    Name,
    Number,
    Enum,
    Assignment,
    EOF,
}

export const eofToken = new Token(LNToken.EOF, "<end of input>");

export const lnLexer = new Lexer<LNToken>(
    [whitespaceExp, LNToken.Whitespace],
    [newlineExp, LNToken.Newline],
    [nameExp, LNToken.Name],
    [numberExp, LNToken.Number],
    [enumExp, LNToken.Enum],
    [asmtExp, LNToken.Assignment],
);
