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

const five = require("johnny-five");
const mt=require("microtime");
const board = new five.Board({port: "COM5"});


function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
class Stepper{
  constructor(number_of_steps, M1, M2, M3, M4){
    this.step_number = 0;    // which step the motor is on
    this.direction = 0;      // motor direction
    this.last_step_time = 0; // time stamp in us of the last step taken
    this.number_of_steps = number_of_steps; // total number of steps for this motor

    // Arduino pins for the motor control connection:
    this.M1 = M1;
    this.M1x = M1;
    this.M2 = M2;
    this.M2x = M2;
    this.M3 = M3;
    this.M3x = M3;
    this.M4 = M4;
    this.M4x = M4;

    // setup the pins on the microcontroller:
    board.pinMode(this.M1, five.Pin.OUTPUT);
    board.pinMode(this.M2, five.Pin.OUTPUT);
    board.pinMode(this.M3, five.Pin.OUTPUT);
    board.pinMode(this.M4, five.Pin.OUTPUT);
  }

  /*
  * Sets the speed in revs per minute
  */
  setSpeed(whatSpeed){
    this.step_delay = 60 * 1000 * 1000 / this.number_of_steps / whatSpeed;
    console.log(this.step_delay);
  }

  /*
   * Moves the motor steps_to_move steps.  If the number is negative,
   * the motor moves in the reverse direction.
  */
  step(steps_to_move){
    let steps_left = Math.abs(steps_to_move);  // how many steps to take
    // determine direction based on whether steps_to_mode is + or -:
    if (steps_to_move > 0) { 
      this.direction = 1; 
      this.M1=this.M1x;
      this.M2=this.M2x;
      this.M3=this.M3x;
      this.M4=this.M4x;
    }
    if (steps_to_move < 0) { 
      this.direction = 0; 
      this.M1=this.M2x;
      this.M2=this.M1x;
      this.M3=this.M4x;
      this.M4=this.M3x;
    }


    // decrement the number of steps, moving one step each time:
    while (steps_left > 0){
      // move only if the appropriate delay has passed:
      let now=mt.now();
      if (now - this.last_step_time >= this.step_delay){
        this.last_step_time=now;
        // increment or decrement the step number,
        // depending on direction:
        if (this.direction == 1){
          this.step_number++;
          if (this.step_number == this.number_of_steps) {
            this.step_number = 0;
          }
        } else {
          if (this.step_number == 0) {
            this.step_number = this.number_of_steps;
          }
          this.step_number--;
        }
        // decrement the steps left:
        steps_left--;
        this.stepMotor(this.step_number % 4);
      }
    }
  }

  /*
  * Moves the motor forward or backwards.
  */   
  stepMotor(thisStep){
    switch (thisStep) {
      case 0:  //1010
        board.digitalWrite(this.M1, 1);
        board.digitalWrite(this.M2, 0);
        board.digitalWrite(this.M3, 0);
        board.digitalWrite(this.M4, 1);
      break;
      case 1:  //0110
        board.digitalWrite(this.M1, 0);
        board.digitalWrite(this.M2, 1);
        board.digitalWrite(this.M3, 0);
        board.digitalWrite(this.M4, 1);
      break;
      case 2:  //0101
        board.digitalWrite(this.M1, 0);
        board.digitalWrite(this.M2, 1);
        board.digitalWrite(this.M3, 1);
        board.digitalWrite(this.M4, 0);
      break;
      case 3:  //1001
        board.digitalWrite(this.M1, 1);
        board.digitalWrite(this.M2, 0);
        board.digitalWrite(this.M3, 1);
        board.digitalWrite(this.M4, 0);
      break;
    }
  }
}


board.on("ready", () => {
  let last_step_time=0, now;
  const myStepper=new Stepper(200,4,7,5,6);
  myStepper.setSpeed(100); 
  setTimeout(function(){myStepper.step(-500);},0);
  setTimeout(function(){myStepper.step(50);},3000);
  setTimeout(function(){myStepper.step(-50);},4000);
  setTimeout(function(){myStepper.step(200);},5000);
  setTimeout(function(){myStepper.step(-100);},6000);
  setTimeout(function(){myStepper.step(400);},7000);

  setTimeout(function(){myStepper.step(-500);},10000);
  setTimeout(function(){myStepper.step(50);},13000);
  setTimeout(function(){myStepper.step(-50);},14000);
  setTimeout(function(){myStepper.step(200);},15000);
  setTimeout(function(){myStepper.step(-100);},16000);
  setTimeout(function(){myStepper.step(400);},17000);

  setTimeout(function(){myStepper.step(-500);},20000);
  setTimeout(function(){myStepper.step(50);},23000);
  setTimeout(function(){myStepper.step(-50);},24000);
  setTimeout(function(){myStepper.step(200);},25000);
  setTimeout(function(){myStepper.step(-100);},26000);
  setTimeout(function(){myStepper.step(400);},27000);

  setTimeout(function(){myStepper.step(-500);},30000);
  setTimeout(function(){myStepper.step(50);},33000);
  setTimeout(function(){myStepper.step(-50);},34000);
  setTimeout(function(){myStepper.step(200);},35000);
  setTimeout(function(){myStepper.step(-100);},36000);
  setTimeout(function(){myStepper.step(400);},37000);

  setTimeout(function(){myStepper.step(-500);},40000);
  setTimeout(function(){myStepper.step(50);},43000);
  setTimeout(function(){myStepper.step(-50);},44000);
  setTimeout(function(){myStepper.step(200);},45000);
  setTimeout(function(){myStepper.step(-100);},46000);
  setTimeout(function(){myStepper.step(400);},47000);

  setTimeout(function(){myStepper.step(-500);},50000);
  setTimeout(function(){myStepper.step(50);},53000);
  setTimeout(function(){myStepper.step(-50);},54000);
  setTimeout(function(){myStepper.step(200);},55000);
  setTimeout(function(){myStepper.step(-100);},56000);
  setTimeout(function(){myStepper.step(400);},57000);
});