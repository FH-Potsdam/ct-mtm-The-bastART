/**
 * Mandatory tasks
 * @todo Connect a servo and draw something
 *
 * Possible tasks
 * @todo Connect two servos and draw something
 * @todo Attach one servo to another and draw something
 * @todo Attach a DC Motor and a servo and draw something
 * @todo Make the DC motor move the papar and the servo move the pen
 * @todo Make the above ☝️ - work the other way around
 * @todo Attach a stepper motor and a servo and draw something
 * @todo Attach a stepper, a servo and a dc motor and draw
 * @todo …
 * you get the gist! Draw something
 *
 * See for more docs
 * Servos http://johnny-five.io/examples/#servo
 * DC Motors http://johnny-five.io/examples/#motor
 * Stepper http://johnny-five.io/examples/#stepper-motor
 *
 *
 */

const five = require("johnny-five"); // this is a module installed in the node_modules by running `npm install johnny-five`
// const myFunkyModule = require("./lib/example"); // this is a module you write the difference is the relative path
// myFunkyModule.log("He Ho - Let's go!");

const board = new five.Board();
let led = undefined;

board.on("ready", function() {
  led = new five.Led(13);
  led.blink(200);
});
