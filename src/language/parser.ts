import {any, lexerInput, mret, parse, Token} from "parzec";

import {eofToken, lnLexer, LNToken} from "./lexer";
import {cardinalParser} from "./cardinal";
import {numberParser} from "./number";
import {colorParser} from "./color";
import {directionParser} from "./direction";
import {Instruction} from "./instruction";
import {commandParser} from "./command";
import {newlineParser} from "./newline";
import {Program} from "./program";
import {Parameter} from "./parameter";

const instruction = commandParser.bind(c => {
    return any<Parameter, Token<LNToken>>(
        cardinalParser,
        colorParser,
        directionParser,
        numberParser,
    ).zeroOrMore().bind(a => {
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
