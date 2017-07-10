/*
// Copyright 2017, RadiantBlue Technologies, Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/


//Event Listeners
document.getElementById('show-logs-btn').addEventListener('click', toggleLogShow);
document.getElementById('logs_container').addEventListener('click', function(e){
	e = window.event || e;
	if(this === e.target){
		toggleLogShow();
	}
});
document.getElementById('logs').addEventListener('click', function(e){
	e = window.event || e;
	if(this === e.target){
		toggleLogShow();
	}
});


//Functions
function toggleLogShow(){
	var $logs = document.getElementById('logs');
	var $chevron = document.getElementById('log-chev');
	if($logs.classList.contains('closed')){
		openLogs($logs, $chevron);
	}else{
		closeLogs($logs, $chevron);
	}
};

function openLogs($logs, $chevron){
	$logs.classList.add('open');
	$logs.classList.remove('closed');
	$chevron.classList.add('chevron_bottom');
	$chevron.classList.remove('chevron_top');
	//var url = window.location.pathname + "/logs";
	//history.pushState(null, null, url);
	document.getElementById('overlaydiv').classList.remove('hide');
	document.getElementById('overlaydiv').classList.add('show');
	document.getElementById('logs_container').classList.remove('hide');
	document.getElementById('logs_container').classList.add('show');
	window.scrollTo(0,0);
};

function closeLogs($logs, $chevron){
	$logs.classList.add('closed');
	$logs.classList.remove('open');
	$chevron.classList.add('chevron_top');
	$chevron.classList.remove('chevron_bottom');
	//var url = window.location.pathname.split("/");
	//url.pop();
	//history.pushState(null, null, url.join("/"));
	document.getElementById('overlaydiv').classList.remove('show');
	document.getElementById('overlaydiv').classList.add('hide');
	document.getElementById('logs_container').classList.remove('show');
	document.getElementById('logs_container').classList.add('hide');
};


