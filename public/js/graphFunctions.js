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


//Functions
function customselect(){
	removeParamSelected(this.getAttribute("data-class"));
	this.classList.add('paramselected');
	customtoggle(this.getAttribute("data-class"), true);
};

function timeintervalselect() {
	if(timeInterval != this.value){
		removeParamSelected('ti');
		timeInterval = this.value;
		this.classList.add('paramselected');
		updateGraph();
	}
};

function timerangeselect() {
	if(timeRange != this.value){
		removeParamSelected('tr');
		timeRange = this.value;
		Dashboard.params.timeRange = this.value;
		this.classList.add('paramselected');
		updateGraph();
	}
};

function customoptionselect(t, param, className) {	
	removeParamSelected(param);
	t.classList.add('paramselected');
	customcombine(className);
};

function getcustombutton(className){
	var group = document.getElementsByClassName(className);
	for(var i = 0; i < group.length; i++){
		if(group[i].classList.contains('paramselected'))
			return group[i].value;
	}
	return null;
};

function getcustominput(idName){
	return document.getElementById(idName).value;
};

function customcombine(name){
	var ci = getcustominput(name + '-cust-options-input');
	var cb = getcustombutton(name + '-op');
	if (ci != "" && cb != null){
		var customSwapped = false;
		if(name == 'ti' && timeIntervalCustom != ci + cb){
			timeIntervalCustom = ci + cb;
			timeInterval = 'custom';
			customSwapped = true;
		}
		else if(name == 'tr' && timeRange != ci + cb)
			timeRange = ci + cb;
			Dashboard.params.timeRange = ci + cb;
			customSwapped = true;
		if(customSwapped) updateGraph();
	}
};

function cancelcustom(className) {
	document.getElementById(className + "-custom").classList.remove('paramselected');
	removeParamSelected(className + '-op');
	if(className == 'ti'){
		timeInterval = timeInterval_default;
		document.getElementById("ti-" + timeInterval).click();
	}
	else if(className == 'tr'){
		timeRange = timeRange_default;
		Dashboard.params.timeRange = timeRange_default;
		document.getElementById("tr-" + timeRange).click();
	}
	customtoggle(className, false);

};

function customtoggle(prefix, on) {
	if(on){
		document.getElementById(prefix + '-nocust').style.display = 'none';
		document.getElementById(prefix + '-cancel-cust').style.display = 'inline';
		document.getElementById(prefix + '-cust-options').style.display = 'inline';
	}else{
		document.getElementById(prefix + '-nocust').style.display = 'inline';
		document.getElementById(prefix + '-cancel-cust').style.display = 'none';
		document.getElementById(prefix + '-cust-options').style.display = 'none';
		updateGraph();
	}
};
	
function checkboxselect(elem) {
	var group = document.getElementsByClassName('ep');
	Dashboard.params.endpoints = [];
	endpointList = "";
	for(var i = 0; i < group.length; i++){
		if(group[i].checked == true){
			if(endpointList != ""){
				endpointList += ",";
			}
			endpointList += group[i].value;
			Dashboard.params.endpoints.push(group[i].getAttribute("data-endpoint"));
		}
	}
	if(endpointList == ""){
		endpointList += elem.value;
		Dashboard.params.endpoints.push(elem.getAttribute("data-endpoint"));
		elem.checked = true;
	}
	updateGraph();
};
function updateActor(){
	if(actor != document.getElementById("actorinput").value){
		actor = document.getElementById("actorinput").value;
		Dashboard.params.actor = document.getElementById("actorinput").value;
		updateGraph();
	}
};

function emptyActor(){
	if(actor == ""){
		actor = window.prompt("Enter actor");
		Dashboard.params.actor = actor;
		emptyActor();
	}else{
		return;
	}
};

function removeParamSelected(className){
	var group = document.getElementsByClassName(className);
	for(var i = 0; i < group.length; i++){
		group[i].classList.remove('paramselected');
	}
};

function updateGraph(){
	document.getElementById('graphimg').src = eval('`' + link_template + '`');
	outsideParamsChanged = true;
};

