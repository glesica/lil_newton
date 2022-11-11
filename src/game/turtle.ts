import {Actor, CollisionType, Color, Engine, Polygon, PolygonCollider, vec} from "excalibur";

export class Turtle extends Actor {
    // Rotation speed in radians per second.
    private rotationSpeed: number = 1.0;

    constructor(size: number) {
        const halfSize = size / 2;
        const points = [
            vec(halfSize, halfSize),
            vec(-halfSize, halfSize),
            vec(0, -halfSize),
        ];
        super({
            x: 0,
            y: 0,
            color: Color.Chartreuse,
            collider: new PolygonCollider({
                points: points,
            }),
            collisionType: CollisionType.Active,
        });
        const shape = new Polygon({
            color: Color.Red,
            points: points,
        });
        this.graphics.use(shape);
    }

    onInitialize(engine: Engine) {
        super.onInitialize(engine);
        this.pos.x = engine.halfDrawWidth;
        this.pos.y = engine.halfDrawHeight;
    }

    get rotationInDegrees(): number {
        return this.rotation / Math.PI * 180;
    }

    async rotateBy(deltaDegrees: number): Promise<void> {
        return new Promise<void>((resolve, _reject) => {
            const deltaRadians = deltaDegrees / 180 * Math.PI;
            this.actions.rotateBy(deltaRadians, this.rotationSpeed);

            const seconds = Math.abs(deltaRadians) * this.rotationSpeed;
            setTimeout(() => {
                resolve();
            }, seconds*1000);
        });
    }

    async thrust(force: number, time: number): Promise<void> {
        return new Promise<void>((resolve, _reject) => {
            const delta = vec(0, -force).rotate(this.rotation);
            this.acc.addEqual(delta);
            setTimeout(() => {
                this.acc.subEqual(delta);
                resolve();
            }, time*1000);
        });
    }
}