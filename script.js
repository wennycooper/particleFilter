/*
The MIT License (MIT)

Copyright (c) 2013 Richard Teammco

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


/* JavaScript code for the Particle Filter page:
 *	all Particle Filter algorithm code is in particleFilter.js...
 *	This file just contains code for setting up the GUI, including
 *	the jQuery UI sliders, buttons, etc.
 */


// setup jQuery UI sliders:
$(function() {
	// slider for number of particles
	$("#number_slider").slider({
		min: 1,
		max: 1000,
		value: 100,
		slide: function(e, ui){
			NUM_PARTICLES = $("#number_slider").slider('value');
			$("#number_val").text("" + NUM_PARTICLES);
			adjustParticleCount();
		},
		change: function(e, ui){
			NUM_PARTICLES = $("#number_slider").slider('value');
			$("#number_val").text("" + NUM_PARTICLES);
			adjustParticleCount();
		}
	});
	
	// slider for frame rate (animation speed in frames per second [FPS])
	$("#speed_slider").slider({
		min: 1,
		max: 60,
		value: 10,
		slide: function(e, ui){
			FPS = $("#speed_slider").slider('value');
			$("#speed_val").text("" + FPS + " FPS");
		},
		change: function(e, ui){
			FPS = $("#speed_slider").slider('value');
			$("#speed_val").text("" + FPS + " FPS");
		}
	});
	
	// slider for random walk frequency
	$("#rw_freq_slider").slider({
		min: 0,
		max: 30,
		value: 5,
		slide: function(e, ui){
			R_WALK_FREQUENCY = $("#rw_freq_slider").slider('value');
			var freqStr;
			if(R_WALK_FREQUENCY == 1)
				freqStr = "Every Frame";
			else if(R_WALK_FREQUENCY == 0)
				freqStr = "Never";
			else
				freqStr = "Every " + R_WALK_FREQUENCY + " Frames";
			$("#rw_freq_val").text(freqStr);
		},
		change: function(e, ui){
			R_WALK_FREQUENCY = $("#rw_freq_slider").slider('value');
			var freqStr;
			if(R_WALK_FREQUENCY == 1)
				freqStr = "Every Frame";
			else if(R_WALK_FREQUENCY == 0)
				freqStr = "Never";
			else
				freqStr = "Every " + R_WALK_FREQUENCY + " Frames";
			$("#rw_freq_val").text(freqStr);
		}
	});
	
	// slider for random walk max distance
	$("#rw_dist_slider").slider({
		min: 0,
		max: 300,
		value: 40,
		slide: function(e, ui){
			R_WALK_MAX = $("#rw_dist_slider").slider('value');
			$("#rw_dist_val").text("" + R_WALK_MAX);
		},
		change: function(e, ui){
			R_WALK_MAX = $("#rw_dist_slider").slider('value');
			$("#rw_dist_val").text("" + R_WALK_MAX);
		}
	});
});


// call reset all slider values to default
function resetValues(){
	NUM_PARTICLES = 100;
	$("#number_slider").slider('value', NUM_PARTICLES);
	$("#number_val").text("" + NUM_PARTICLES);
	adjustParticleCount();
	
	FPS = 10;
	$("#speed_slider").slider('value', FPS);
	$("#speed_val").text("" + FPS + " FPS");
	
	R_WALK_FREQUENCY = 5;
	$("#rw_freq_slider").slider('value', R_WALK_FREQUENCY);
	$("#rw_freq_val").text("Every 5 Frames");
	
	R_WALK_MAX = 40;
	$("#rw_dist_slider").slider('value', R_WALK_MAX);
	$("#rw_dist_val").text("" + R_WALK_MAX);
}


// add or remove particles, depending on the new number
function adjustParticleCount() {
	// if particles are missing, add new ones until quantity is correct
	while(particles.length < NUM_PARTICLES){
		var p = new Particle();
		p.randomize();
		particles.push(p);
	}
	
	// if there are too many particles, randomly remove some until quantity is correct
	if(particles.length > NUM_PARTICLES){
		particles.splice(0, (particles.length - NUM_PARTICLES));
	}
}


// pause or resume animation
function toggleAnimation() {
	running = !running;
	var toggleSpan = document.getElementById("on_or_off");
	if(running)
		toggleSpan.innerHTML = "Pause";
	else
		toggleSpan.innerHTML = "Resume";
}


// turn mouse movement on or off
function toggleMove(event){
	moving = !moving;
	if(moving) {
		$("#lock_unlock_pos").css("color", "red");
		$("#lock_unlock_pos").text("lock");
		updatePosition(event);
	}
	else {
		$("#lock_unlock_pos").css("color", "green");
		$("#lock_unlock_pos").text("unlock");
	}
}


// restart the animation (re-randomize everything and restart animation)
function restart() {
	document.getElementById("on_or_off").innerHTML = "Pause";
	clearTimeout(animationHandle);
	running = false;
	init();
}


// update robot position text displayed on the page:
function updatePositionText(x, y) {
	document.getElementById("positionText").innerHTML = "" + x + ", " + y;
}
