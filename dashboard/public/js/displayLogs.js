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
var logTools;

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
	document.getElementById('overlaydiv').classList.remove('hide');
	document.getElementById('overlaydiv').classList.add('show');
	document.getElementById('logs_container').classList.remove('hide');
	document.getElementById('logs_container').classList.add('show');
	window.scrollTo(0,0);
	
	getLogs(0);
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
};

function getLogs(page){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("logs_body_inner").innerHTML = "";
			document.getElementById("logs_pagination_info").innerHTML = "";
			var logData = JSON.parse(this.responseText);
			logTools = {
				Min: logData.page * logData.size + 1,
				Max: logData.hits.length + logData.page * logData.size,
				Count: logData.total,
				Page: logData.page
			};
			document.getElementById("logs_pagination_info").innerHTML = "Logs <b>" + logTools.Min + "</b> - <b>" + logTools.Max + "</b> of <b>" + logTools.Count + "</b>";
			document.getElementById("logs_pagination_controllers_back").addEventListener('click', function(){ paginationBack(logTools.Page); });
			document.getElementById("logs_pagination_controllers_forward").addEventListener('click', function(){ paginationForward(logTools.Page); });
			if(logTools.Page > 0){
				toggleClasses(document.getElementById("logs_pagination_controllers_back"), "logs_pagination_unactive", "logs_pagination_active");
			}else{
				toggleClasses(document.getElementById("logs_pagination_controllers_back"), "logs_pagination_active", "logs_pagination_unactive");
			}
			if(logTools.Count > logTools.Max){
				toggleClasses(document.getElementById("logs_pagination_controllers_forward"), "logs_pagination_unactive", "logs_pagination_active");
			}else{
				toggleClasses(document.getElementById("logs_pagination_controllers_forward"), "logs_pagination_active", "logs_pagination_unactive");
			}

			parseLogs(logData.hits);
		}
	};
	xhr.open("GET", "/logs/" + Dash.name + "?page=" + page, true);
	xhr.send();
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
function toggleLogs(event){
	var elem = event.target;
	while(elem.classList.contains("log_message") !== true){
		elem = elem.parentNode;
	}

	if(elem.getElementsByClassName("log_message_child")[0].classList.contains("log_open")){
		toggleClassesGroup(elem.getElementsByClassName("log_message_child"), "log_open", "log_closed");
		toggleClasses(elem.getElementsByClassName("expandArrow")[0], "chevron_top", "chevron_bottom");
	}else{
		toggleClassesGroup(elem.getElementsByClassName("log_message_child"), "log_closed", "log_open");
		toggleClasses(elem.getElementsByClassName("expandArrow")[0], "chevron_bottom", "chevron_top");
	}
};

function paginationBack(currentPage){
	if(document.getElementById("logs_pagination_controllers_back").classList.contains("logs_pagination_active")){	
		var newpage = parseInt(currentPage) - 1;
		toggleClasses(document.getElementById("logs_pagination_controllers_back"), "logs_pagination_active", "logs_pagination_unactive");
		getLogs(newpage);
	}
};

function paginationForward(currentPage){
	if(document.getElementById("logs_pagination_controllers_forward").classList.contains("logs_pagination_active")){
		var newpage = parseInt(currentPage) + 1;
		toggleClasses(document.getElementById("logs_pagination_controllers_forward"), "logs_pagination_active", "logs_pagination_unactive");	
		getLogs(newpage);
	}
};


