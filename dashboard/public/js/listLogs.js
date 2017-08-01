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
			console.log(field);
			newLine.innerHTML += unpackObject(field, logs[i]["_source"][field], null);
		}
		logbody.appendChild(newLine)
	}
		document.getElementById("logs_body_inner").appendChild(logbody);
		addClassListener(document.getElementsByClassName("log_message"), 'click', toggleLogs);
};

document.getElementById('logs_refresh').addEventListener('click', function(){ getLogs({"page": 0, "count": logTools.PerPage}, "") });

getLogs({"page":0, "count": 25}, "");
