// # Example of using the button
// created By Holger Will (h.will@klimapartner.de)
// created for [Klimapartner GmbH](http://klimapartner.de/)
// this code is published under GPL v3.0
// call this with a commandline parameter. use:
// "example_async_await.js on" to send a click event on button A1
// "example_async_await.js off" to send a click event on button A0

// for node version < 8.0 run with node --harmony-async-await example_async_await.js on

var enocean = require("node-enocean")();           // require node-enocean
var Button = require("../");                     // require the Button impl.
// open the serialport in this case it's an USB Stick. the enocean pi is "/dev/ttyAMA0" and on Windows you would need something like "COM1"
enocean.listen("/dev/ttyUSB0");
enocean.on("ready", async function(){               // when ready
	var button = new Button(enocean,1)       // create a new Button an give it the address 1
	if(process.argv[2] == "on"){
		// if you pass the word "on" via the command line, invoke the click Event
		// this can be use to teach in the button
		await button.A1.click()               // if you pass the word "on" via the command line, invoke the click Event on A1
	}else{
		await button.A0.click()               // if you pass the word "off" via the command line, invoke the click Event on A0
	}
	enocean.close()				 	// stop listening to the serial port and return
});
