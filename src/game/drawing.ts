import {Color, ExcaliburGraphicsContext, PostUpdateEvent, Scene, Vector,} from "excalibur";

import {Turtle} from "./turtle";

export class Drawing extends Scene {
    private points: Array<Vector|Color> = [];

    private prevPoint?: Vector;

    constructor(turtle: Turtle) {
        super();

        this.add(turtle);

        turtle.on('postupdate', (evt: PostUpdateEvent<Turtle>) => {
            const pos = evt.target.pos.clone();

            if (this.points.length == 0) {
                this.points.push(pos);
                this.prevPoint = pos;
                return;
            }

            const dist = pos.distance(this.prevPoint);
            if (dist > 3) {
                this.points.push(pos);
                return;
            }
        });
    }

    setLineColor(color: Color) {
        this.points.push(color);
    }

    onPostDraw(ctx: ExcaliburGraphicsContext, _delta: number) {
        super.onPostDraw(ctx, _delta);

        ctx.save();
        ctx.z = -1;

        let color = Color.DarkGray;
        for (let i = 0; i < this.points.length - 1; i++) {
            const item = this.points[i];
            if (item instanceof Color) {
                color = item;
                continue;
            }

            const start = this.points[i] as Vector;
            const end = this.points[i+1] as Vector;
            ctx.drawLine(start, end, color, 1);
        }

        ctx.restore();
    }
}