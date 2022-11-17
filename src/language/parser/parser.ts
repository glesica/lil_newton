import {any, lexerInput, mret, parse, Token} from "parzec";

import {eofToken, lnLexer, LNToken} from "./lexer";
import {Instr} from "../ast/Instr";
import {nameParser} from "./name";
import {newlineParser} from "./newline";
import {Program} from "../ast/Program";
import {whitespaceParser} from "./whitespace";
import {enumParser} from "./enum";
import {numberParser} from "./number";
import {Num} from "../ast/Num";
import {Name} from "../ast/Name";
import {Enum} from "../ast/Enum";
import {asmtParser} from "./asmt";
import {Asmt} from "../ast/Asmt";

export type Element = Enum | Name | Num;

const instruction = nameParser
    .surroundedBy(whitespaceParser.zeroOrMore())
    .bind(n => {
        return any<Element, Token<LNToken>>(
            enumParser,
            nameParser,
            numberParser,
        )
            .surroundedBy(whitespaceParser.zeroOrMore())
            .zeroOrMore()
            .bind(a => {
                return mret(new Instr(n, a));
            });
    });

const assignment = nameParser
    .surroundedBy(whitespaceParser.zeroOrMore())
    .followedBy(asmtParser)
    .followedBy(whitespaceParser.zeroOrMore())
    .bind(n => {
        return any<Element, Token<LNToken>>(
            enumParser,
            nameParser,
            numberParser,
        )
            .surroundedBy(whitespaceParser.zeroOrMore())
            .bind(v => {
                return mret(new Asmt(n, v));
            });
    });

// TODO: This needs to handle assignments as well as instructions
const root = any<Instr | Asmt, Token<LNToken>>(
    instruction,
    assignment,
)
    .oneOrMoreSeparatedBy(newlineParser)
    .map(elements => new Program(elements));

export function parseProgram(program: string): Program {
    const tokens = lexerInput(program, lnLexer, eofToken);
    const ast = parse(root, tokens);
    console.log(ast);
    return ast;
}
