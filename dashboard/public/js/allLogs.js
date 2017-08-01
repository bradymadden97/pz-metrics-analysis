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


function getLogs(query_dictionary, graphName){
	outsideParamsChanged = false;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("logs_body_inner").innerHTML = "";
			document.getElementById("logs_pagination_info").innerHTML = "";
			var logData = JSON.parse(this.responseText);
			logTools = {
				Min: Math.min(logData.page * logData.size + 1, logData.total),
				Max: logData.hits.length + logData.page * logData.size,
				Count: logData.total,
				Page: logData.page,
				PerPage: logData.size
			};
			document.getElementById("logs_pagination_info").innerHTML = "Logs <b>" + logTools.Min + "</b> - <b>" + logTools.Max + "</b> of <b>" + logTools.Count + "</b>";
			document.getElementById("logs_pagination_controllers_back").addEventListener('click', function(){ paginationBack(logTools.Page); });
			document.getElementById("logs_pagination_controllers_forward").addEventListener('click', function(){ paginationForward(logTools.Page); });
			document.getElementById("logs_count_input").addEventListener('blur', countChanging);
			document.getElementById("logs_count_input").addEventListener('input', countChanging);
			document.getElementById("logs_count_button").addEventListener('click', countRefresh);
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
			document.getElementById("logs_count_input").value = logTools.PerPage;
			countChanging()
			parseLogs(logData.hits);
		}
	};
	var queryString = buildQueryString(getExtraParams(query_dictionary));
	xhr.open("GET", "/api/logs/" + Dashboard.name + queryString, true);
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
function paginationBack(currentPage){
	if(document.getElementById("logs_pagination_controllers_back").classList.contains("logs_pagination_active")){	
		var newpage = parseInt(currentPage) - 1;
		toggleClasses(document.getElementById("logs_pagination_controllers_back"), "logs_pagination_active", "logs_pagination_unactive");
		var query_dictionary = {"page": newpage, "count": logTools.PerPage};
		if(!Dashboard.name)
			getLogs(query_dictionary, null);
		else
			getLogs(query_dictionary, Dashboard.name);
	}
};

function paginationForward(currentPage){
	if(document.getElementById("logs_pagination_controllers_forward").classList.contains("logs_pagination_active")){
		var newpage = parseInt(currentPage) + 1;
		toggleClasses(document.getElementById("logs_pagination_controllers_forward"), "logs_pagination_active", "logs_pagination_unactive");	
		var query_dictionary = {"page": newpage, "count": logTools.PerPage};
		if(!Dashboard.name)
			getLogs(query_dictionary, null);
		else
			getLogs(query_dictionary, Dashboard.name);
	}
};

function buildQueryString(query_dictionary){
	var str = "?";
	for( key in query_dictionary){
		if(query_dictionary[key] !== null)
			str += key + "=" + query_dictionary[key] + "&";
	}
	return str;
};

function countChanging(){
	if(parseInt(document.getElementById("logs_count_input").value) !== parseInt(logTools.PerPage)){
		document.getElementById("logs_count_button").disabled = false;
		return false;
	}else{
		document.getElementById("logs_count_button").disabled = true;
		return true;
	}
};

function countRefresh(){
	var query_dictionary = {"page": null, "count": parseInt(document.getElementById("logs_count_input").value)};
	if(!countChanging()){
		if(!Dashboard.name)
			getLogs(query_dictionary, null);
		else
			getLogs(query_dictionary, Dashboard.name);
	}
};
