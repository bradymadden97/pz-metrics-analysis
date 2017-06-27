//Display Initial
if(window.timeInterval){
	document.getElementById("ti-" + timeInterval).classList.add("paramselected");
}
if(window.timeRange){
	document.getElementById("tr-" + timeRange).classList.add("paramselected");
}
if(window.actor){
	document.getElementById("actorinput").value = actor;
}

//Event Listeners
$timeIntGroup = document.getElementsByClassName('ti');
$timeRangeGroup = document.getElementsByClassName('tr');
for(var i = 0; i < $timeIntGroup.length; i++){
	$timeIntGroup[i].addEventListener('click', timeintervalselect);
}
for(var j = 0; j < $timeRangeGroup.length; j++){
	$timeRangeGroup[j].addEventListener('click',timerangeselect);
}
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


//Parameter Changes
function timeintervalselect() {
	var group = document.getElementsByClassName('ti');
	for(var i = 0; i < group.length; i++){
		group[i].classList.remove('paramselected');
	}
	timeInterval = this.value;
	this.classList.add('paramselected');
};

function timerangeselect() {
	var group = document.getElementsByClassName('tr');
	for(var i = 0; i < group.length; i++){
		group[i].classList.remove('paramselected');
	}
	timeRange = this.value;
	this.classList.add('paramselected');
};

function updateActor(){
	actor = document.getElementById("actorinput").value;
}


