import {Lexer, Token} from "parzec";

import {cardinalExp} from "./cardinal";
import {colorExp} from "./color";
import {commandExp} from "./command";
import {directionExp} from "./direction";
import {numberExp} from "./number";
import {whitespaceExp} from "./whitespace";
import {newlineExp} from "./newline";

export enum LNToken {
    Cardinal,
    Color,
    Command,
    Direction,
    Newline,
    Number,
    Whitespace,
    EOF,
}

export const eofToken = new Token(LNToken.EOF, "<end of input>");

export const lnLexer = new Lexer<LNToken>(
    [whitespaceExp, LNToken.Whitespace],
    [newlineExp, LNToken.Newline],
    [commandExp, LNToken.Command],
    [cardinalExp, LNToken.Cardinal],
    [colorExp, LNToken.Color],
    [directionExp, LNToken.Direction],
    [numberExp, LNToken.Number],
);
