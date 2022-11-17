import {Color} from "excalibur";

export class Scope {
    private readonly enums: Record<string, any> = {
        // Colors
        'Black': Color.Black,
        'White': Color.White,
        'Red': Color.Red,
        'Green': Color.Green,
        'Blue': Color.Blue,
        'Orange': Color.Orange,
        'Cyan': Color.Cyan,
        'Azure': Color.Azure,
        'Violet': Color.Violet,
        'Yellow': Color.Yellow,

        // Direction
        'Left': -1,
        'Right': 1,

        // Heading
        'N': 0.0,
        'NE': 45.0,
        'E': 90.0,
        'SE': 135.0,
        'S': 180.0,
        'SW': 225.0,
        'W': 270.0,
        'NW': 315.0,
    };

    private readonly vars: Record<string, any> = {};

    lookupEnum(key: string): any {
        return this.enums[key];
    }

    // TODO: There's no fundamental difference between vars and enums

    setVar(key: string, value: any) {
        this.vars[key] = value;
    }

    getVar(key: string): any {
        return this.vars[key];
    }
}
