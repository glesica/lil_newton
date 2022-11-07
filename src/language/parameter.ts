// Maybe we should do some kind of container type for parameters
// so that we can check the type during evaluation and then handle
// it properly.
import {CardinalValue} from "./cardinal";
import {DirectionValue} from "./direction";
import {NumberValue} from "./number";
import {ColorValue} from "./color";

export type Parameter = CardinalValue | ColorValue | DirectionValue | NumberValue;
