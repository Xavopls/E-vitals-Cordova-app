//
// Copyright (c) Global Vitals. All rights reserved.
// Licensed under the MIT license.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


//parameters (can be updated)
var max_time_stored = 30;//maximum number of stored seconds
var api_key = "sRlXgS0xca7q5";
var api_url = 'https://api.globalvitals.com';

//initialization of other variables (not to be updated)
var number_samples = 0;	
var cur_time = 0;
var T = [], X = [], Y = [], Z = [];		
var base_time = new Date().getTime();
var prev_time = 0;
var max_time_diff = 10;//maximum time difference in milliseconds
var sampling_rate = 0; //current sampling rate	
var running = false;	

//only when generating fake motion
var fakeMotion = false;//for desktop debugging purposes
var interval = null;
var refreshRateHR = 20;//milisecond



///////////////////////////////////
//unregister motion tracking	
///////////////////////////////////	
function stopRecording(){	
	window.removeEventListener('devicemotion', onSensorCall, false);
	running = false;
	if (fakeMotion){
		clearInterval(interval);
	}
}
	
		
///////////////////////////////////
//register motion tracking	
///////////////////////////////////	
var onSensorCall = function(event){onSensorChanged([event.accelerationIncludingGravity.x,event.accelerationIncludingGravity.y,event.accelerationIncludingGravity.z]);};

function startRecording(){	
	stopRecording();
	T = [], X = [], Y = [], Z = [];
	number_samples = 0;
	if(window.DeviceMotionEvent){
		window.addEventListener('devicemotion',onSensorCall,false);
	}	
	if (fakeMotion){
		interval = setInterval(updateFakeHR,refreshRateHR); //this fakes date when running on computer	
	}
	running = true;	
	document.getElementById("output").innerHTML = "0 Hz 0 samples";		
	document.getElementById("output2").innerHTML="";	
}

///////////////////////////////////
//auxiliary function to generate fake motion
///////////////////////////////////
function updateFakeHR(){
	onSensorChanged([(Math.random()),(Math.random()+9.8),(Math.random())]);
};


///////////////////////////////////
//capture sensor changes		
///////////////////////////////////
function onSensorChanged(axes){
	cur_time = new Date().getTime()-base_time;
	var x = axes[0];
	var y = axes[1];
	var z = axes[2];
	
	if (cur_time==prev_time || x == null){return;}
	if (T.length>2){
		sampling_rate = (cur_time-prev_time);
		if (sampling_rate<max_time_diff){return;}
	}
	
	T.push(cur_time*1000000);
	X.push(x); Y.push(y); Z.push(z);	
		
	number_samples = number_samples + 1;							

	while((T[0]/1000000)<(cur_time-max_time_stored*1000)){
		T.shift(); X.shift(); Y.shift(); Z.shift();
	}
			
	number_samples = T.length;	
	
	prev_time = cur_time;
	document.getElementById("output").innerHTML = Math.round(1000/sampling_rate) + " Hz " + T.length + " samples";	
}
			
		

///////////////////////////////////
//generate json packet before sending it to the server	
///////////////////////////////////	
function createPacket(){
	api_key = document.getElementById("apiKey").value;
	var all = new Object;
	all.X = X;
	all.Y = Y;
	all.Z = Z;
	all.T = T;
	all.api_key = api_key;
	all.time_stamp = 0;
	all.other = '';
	all.device = navigator.userAgent;
	
	var out = JSON.stringify(all);
	out = out.replace(/000000,/g, "e+06,");
	return out;
}
	
	
///////////////////////////////////
//send information to the server and wait for response	
///////////////////////////////////
function sendCloudAPI(){	
	document.getElementById("output2").innerHTML="Uploading...";	
	var jsonString = createPacket();
	outputAPI = "{\"hr\":0,\"quality\":0,\"error\":700}";
	$.ajax({
		type: 'POST',
		url: api_url,
		data: {data : jsonString}, 
		dataType: 'json',
		cache: false,
		timeout: 15000,
		error: function(){
			outputAPI = "{\"hr\":0,\"quality\":0,\"error\":700}";
			document.getElementById("output2").innerHTML="Output API: " + outputAPI;				
		},
		success: function(data){
			outputAPI = JSON.stringify(data);
			document.getElementById("output2").innerHTML="Output API: " + outputAPI;
		}											
	});	
}


///////////////////////////////////
//implementation of HTML buttons
///////////////////////////////////
$(".start").on('click', function(){	
	console.log('start');
	if (running == false){
		startRecording();
	}	
})


$(".stop").on('click', function(){	
	console.log('stop');
	stopRecording();
})


$(".upload").on('click', function(){	
	console.log('upload');
	sendCloudAPI();
})


function changeFake() {
  var checkBox = document.getElementById("checkFake");
  stopRecording();

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    fakeMotion = true;
	console.log('going to true');
  } else {    
    fakeMotion = false;
	console.log('going to false');
  }
}


	
