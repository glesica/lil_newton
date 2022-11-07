import {
    Color,
    ExcaliburGraphicsContext, PostUpdateEvent, Scene,
    Vector,
} from "excalibur";

import {Turtle} from "./turtle";

export class Drawing extends Scene {
    private points: Array<Vector> = [];

    private lineColor: Color = Color.DarkGray;

    constructor(turtle: Turtle) {
        super();

        this.add(turtle);

        turtle.on('postupdate', (evt: PostUpdateEvent<Turtle>) => {
            const pos = evt.target.pos.clone();

            if (this.points.length == 0) {
                this.points.push(pos);
                return;
            }

            const dist = pos.distance(this.points[this.points.length-1]);
            if (dist > 3) {
                this.points.push(pos);
                return;
            }
        })
    }

    setLineColor(color: Color) {
        this.lineColor = color;
    }

    onPostDraw(ctx: ExcaliburGraphicsContext, _delta: number) {
        super.onPostDraw(ctx, _delta);

        ctx.save();
        ctx.z = -1;

        for (let i = 0; i < this.points.length - 1; i++) {
            const start = this.points[i];
            const end = this.points[i+1];
            ctx.drawLine(start, end, this.lineColor, 1);
        }

        ctx.restore();
    }
}