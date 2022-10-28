import {Engine, Physics, vec} from 'excalibur';

import {Turtle} from "./turtle";
import {Drawing} from "./drawing";

// Physics.useRealisticPhysics();

const game = new Engine({
    width: 800,
    height: 600,
});

const turtle = new Turtle(25);
const drawing = new Drawing(turtle);

game.addScene('drawing', drawing);
game.goToScene('drawing');

game.start().then(() => {
    setTimeout(() => {
        turtle.rotateBy(0.25 * Math.PI);
        turtle.thrust(10, 3);
    }, 1000);
    setTimeout(() => {
        turtle.rotateBy(0.25 * Math.PI);
        turtle.thrust(15, 2);
    }, 4000);
    setTimeout(() => {
        turtle.rotateBy(0.5 * Math.PI);
        turtle.thrust(25, 3);
    }, 6000);
    setTimeout(() => {
        turtle.rotateBy(0.5 * Math.PI);
        turtle.thrust(25, 3);
    }, 9000);
    setTimeout(() => {
        turtle.rotateBy(0.5 * Math.PI);
        turtle.thrust(25, 3);
    }, 12000);
    setTimeout(() => {
        game.stop();
    }, 20000);
});
