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

//Init as global
var outsideParamsChanged;

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
document.getElementById('logs_refresh').addEventListener('click', function(){ getLogs({"page": 0, "count": logTools.PerPage}, Dashboard.name) });


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
	document.getElementById('overlaydiv').classList.remove('hide');
	document.getElementById('overlaydiv').classList.add('show');
	document.getElementById('logs_container').classList.remove('hide');
	document.getElementById('logs_container').classList.add('show');
	window.scrollTo(0,0);
	document.body.style.overflowY = "hidden";
	document.body.style.overflowX = "hidden";
	var query_dictionary = {"page": 0, "count": null};
	if(outsideParamsChanged){
		getLogs(query_dictionary, Dashboard.name);
	}
};

function closeLogs($logs, $chevron){
	$logs.classList.add('closed');
	$logs.classList.remove('open');
	$chevron.classList.add('chevron_top');
	$chevron.classList.remove('chevron_bottom');
	document.getElementById('overlaydiv').classList.remove('show');
	document.getElementById('overlaydiv').classList.add('hide');
	document.getElementById('logs_container').classList.remove('show');
	document.getElementById('logs_container').classList.add('hide');
	document.body.style.overflowY = "visible";
	document.body.style.overflowX = "visible";
};

function parseLogs(logs){
	var logbody = document.createElement('ul');
	logbody.id = "log_list";
	for(var i = 0; i < logs.length; i++){
		var newLine = document.createElement('li');
		newLine.className = 'log_message';
		var expandArrow = document.createElement('span');
		expandArrow.className = "expandArrow chevron chevron_bottom";
		newLine.appendChild(expandArrow);
		for(field in logs[i]["_source"]){
			newLine.innerHTML += unpackObject(field, logs[i]["_source"][field], null);
		}
		logbody.appendChild(newLine)
	}
		document.getElementById("logs_body_inner").appendChild(logbody);
		addClassListener(document.getElementsByClassName("log_message"), 'click', toggleLogs);
};

function unpackObject(field, obj, parentName){
	if(parentName !== null) parentName += ".";
	else parentName = "";
	if(typeof obj === 'object' && obj !== null){
		childString = ""
		for(f in obj)
			childString += unpackObject(f, obj[f], parentName.concat(field));
		return childString;
	}
	else
		return "<span class='log_message_child log_closed'><b>" + parentName.concat(field) + ": </b>" + obj + "</span>";
};


