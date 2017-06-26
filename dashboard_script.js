var timeInterval = "h"
var timeRange = "7d"

document.getElementById("timeintervalselect").onchange = function(){
	timeInterval = this.options[this.selectedIndex].value;
};

function timerangeselect(btn) {
	var group = document.getElementsByClassName('tr');
	for(var i = 0; i < group.length; i++){
		group[i].classList.remove('paramselected');
	}
	timeRange = btn.value;
	btn.classList.add('paramselected');
};

