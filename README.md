# Creative Technologist - Making Things Move

This is Boilerplate code for making things move using Johnny Five, Arduino and Node.js.

## Prerequisites

1. Arduino Uno Board + USB AB cable
2. Something to flash Firmata to the Arduino.
   - [Arduino IDE](https://www.arduino.cc/en/Main/Software)
   - or [PlatformIO IDE für VSCode](https://platformio.org/)
   - or [PlatformIO Core CLI](https://docs.platformio.org/en/latest/installation.html#)
3. Some components like LEDs or servos

## Setup

### Node.js

In the root of the repository run `npm install`.  

### Flash the StandardFirmata sketch to the Arduino

*Hint: If you want to use steppers motors you will need a different Firmata Sketch. See the comments in example source for the [johnny-five stepper-driver](http://johnny-five.io/examples/stepper-driver/)*

- Connect your board
  
#### With Arduino IDE

- Select the board `Tools > Board > Arduino Uno/ Genuino Uno`
- Select the USB port `Tools > Port > tty/usb.something` (on Windows `COM1` or another number)
- Select the StandardFirmata Sketch `File > Examples Firmata > StandardFirmata`
- Hit upload on the top of the IDE or select `Sketch > Upload`

#### With PlatformIO Core

*Hint: You can use the command `platformio` interchangeably with `pio` both work the same way.*


- Open a new Terminal
- In an empty folder run `platformio init --board uno` to scaffold a new project
- Edit `platformio.ini` and add the following lines below `[env:uno]`

```ini
lib_deps =
  Servo
  Firmata
  SoftwareSerial
```

- Got to [https://github.com/firmata/arduino](https://github.com/firmata/arduino/blob/master/examples/StandardFirmata/StandardFirmata.ino) and copy the content of `examples/StandardFirmata/StandardFirmata.ino` into a new file in the folder called `src/` called `StandardFirmata.ino`
- Run `platformio run` in your Terminal
- Watch the output for errors. If there are missing libraries add them to the `lib_deps`
- With your board connected run `platformio run --target upload`

See the folder [firmwares/standard-firmata](firmwares/standard-firmata) for an example.

---

If everything went smooth you should have your board ready.

## Run

With your board running a firmata sketch and connected to the computer run:

`npm start`

## Troubleshooting

### Board not recognized

Is your board connected and recognized? Did you select the right port in the IDE?

To test this you should try to upload a simple Blink sketch from the Arduino IDE `File > Examples > 01.Basic > Blink`

Sometimes using a different USB port helps.

### PlatformIO does not find the board

Try running `pio upgrade` and `pio update`
Try running `pio device list` is your board showing up?
Try running the `pio run --target upload --upload-port` and add the device port from the list to the end.
