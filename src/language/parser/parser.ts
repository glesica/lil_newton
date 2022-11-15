import {any, lexerInput, mret, parse, Token} from "parzec";

import {eofToken, lnLexer, LNToken} from "./lexer";
import {Instruction} from "../ast/Instruction";
import {nameParser} from "./name";
import {newlineParser} from "./newline";
import {Program} from "../ast/Program";
import {whitespaceParser} from "./whitespace";
import {enumParser} from "./enum";
import {numberParser} from "./number";
import {Num} from "../ast/Num";
import {Name} from "../ast/Name";
import {Enum} from "../ast/Enum";

type Element = Enum | Name | Num;

const instruction = nameParser
    .surroundedBy(whitespaceParser.zeroOrMore())
    .bind(c => {
        return any<Element, Token<LNToken>>(
            enumParser,
            nameParser,
            numberParser,
        )
            .surroundedBy(whitespaceParser.zeroOrMore())
            .zeroOrMore()
            .bind(a => {
                return mret(new Instruction(c, a));
            });
    });

const root = instruction
    .oneOrMoreSeparatedBy(newlineParser)
    .map(i => new Program(i));

export function parseProgram(program: string): Program {
    const tokens = lexerInput(program, lnLexer, eofToken);
    const ast = parse(root, tokens);
    console.log(ast);
    return ast;
}
