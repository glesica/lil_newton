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

const instruction = commandParser.bind(c => {
    return any<any, Token<LNToken>>(
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

export function parseProgram(program: string) {
    const tokens = lexerInput("foo N S Blue 5 7.2\nfoo Left N 3", lnLexer, eofToken);
    console.log(tokens);
    console.log(parse(root, tokens));
}
