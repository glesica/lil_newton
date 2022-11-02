// export type Command = 'color' | 'move' | 'head' | 'turn' | 'wait';

export class Instruction {
    readonly name: string
    readonly args: Array<any>

    constructor(name: string, args: Array<any>) {
        this.name = name;
        this.args = args;
    }
}
