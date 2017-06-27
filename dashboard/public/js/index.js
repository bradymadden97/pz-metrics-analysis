var baselink = 'http://localhost:8000'

window.onload = function(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){
			data = JSON.parse(this.responseText);
			displayGraphs(data);
		}
	};
	xhr.open("GET", baselink + '/data', true);
	xhr.send();
};

function displayGraphs(data){
	for (var d in data) {
		child = document.createElement('a');
		child.classList.add("graphlistitem");
		child.setAttribute('href', baselink + '/graph/' + d);
		child.nodeValue = d;
		child.innerText = d;
		document.getElementById("graphoptions").appendChild(child);
	}	
};