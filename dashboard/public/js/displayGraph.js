//Display Initial
if(window.timeInterval){
	document.getElementById("ti-" + timeInterval).classList.add("paramselected");
	timeInterval_default = timeInterval;
}
if(window.timeRange){
	document.getElementById("tr-" + timeRange).classList.add("paramselected");
	timeRange_default = timeRange;
}
if(window.actor != undefined){
	emptyActor();
	document.getElementById("actorinput").value = actor;
}
if(window.endpoints){
	endpoints = endpoints.split(",");
	for(var i = 0; i < endpoints.length; i++){
		document.getElementById("ep-" + endpoints[i]).checked = true;
		if(endpointList != ""){
			endpointList += ",";
		}
		endpointList += document.getElementById("ep-" + endpoints[i]).value;
	}
}


//Event Listeners
addListener(document.getElementsByClassName('ti'), 'click', timeintervalselect);
addListener(document.getElementsByClassName('ti-op'), 'click', function(){var t=this;customoptionselect(t, 'ti-op', 'ti');});
addListener(document.getElementsByClassName('tr'), 'click', timerangeselect);
addListener(document.getElementsByClassName('tr-op'), 'click', function(){var t=this;customoptionselect(t, 'tr-op', 'tr');});
addListener(document.getElementsByClassName('ep'), 'change', checkboxselect);
addListener(document.getElementsByClassName('custom'), 'click', customselect);

try{ 	
	document.getElementById('tr-cancel-cust').addEventListener('click', function(){cancelcustom('tr');}); 
	document.getElementById('tr-cust-options-input').addEventListener('blur', function(){customcombine('tr');});
}
catch(err){}
try{
	document.getElementById('ti-cancel-cust').addEventListener('click', function(){cancelcustom('ti');});
	document.getElementById('ti-cust-options-input').addEventListener('blur', function(){customcombine('ti');});
}
catch(err){}
try{
	document.getElementById("actorinput").addEventListener('blur', updateActor);
	document.getElementById("actorinput").addEventListener('focus', function(){ this.select();});
	document.addEventListener('keydown', 
		function(event){
			if(event.keyCode == 13){
				document.getElementById("actorinput").blur();
			}
		});
}
catch(err){}

function addListener(group, action, func){
	for(var i = 0; i < group.length; i++){
		group[i].addEventListener(action, func);
	}
}


//Parameter Changes
function customselect(){
	removeParamSelected(this.getAttribute("data-class"));
	this.classList.add('paramselected');
	customtoggle(this.getAttribute("data-class"), true);
};

function timeintervalselect() {
	removeParamSelected('ti');
	timeInterval = this.value;
	this.classList.add('paramselected');
	updateGraph();
};

function timerangeselect() {
	removeParamSelected('tr');
	timeRange = this.value;
	this.classList.add('paramselected');
	updateGraph();
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
		if(name == 'ti'){
			timeIntervalCustom = ci + cb;
			timeInterval = 'custom'
		}
		else if(name == 'tr')
			timeRange = ci + cb;
		updateGraph();
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

function checkboxselect() {
	var group = document.getElementsByClassName('ep');
	endpointList = "";
	for(var i = 0; i < group.length; i++){
		if(group[i].checked == true){
			if(endpointList != ""){
				endpointList += ",";
			}
			endpointList += group[i].value;
		}
	}
	updateGraph();
};

function updateActor(){
	actor = document.getElementById("actorinput").value;
	updateGraph();
};

function emptyActor(){
	if(actor == ""){
		actor = window.prompt("Enter actor");
		emptyActor();
	}
	else return;
};

function removeParamSelected(className){
	var group = document.getElementsByClassName(className);
	for(var i = 0; i < group.length; i++){
		group[i].classList.remove('paramselected');
	}
};

function updateGraph(){
	document.getElementById('graphimg').src = eval('`' + link_template + '`');
};


updateGraph();


