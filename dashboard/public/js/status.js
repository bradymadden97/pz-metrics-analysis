document.getElementById("statusarrow").addEventListener('click', toggleviewstatus);
es_status = "open";
kib_status = "open";

function toggleviewstatus(){
	var view = document.getElementById("portStatus");
	if(view.classList.contains("statusin")){
		view.classList.remove("statusin");
		view.classList.add("statusout");
		document.getElementById("statusarrow").innerHTML = "&laquo";
	}else{
		view.classList.remove("statusout");
		view.classList.add("statusin");
		document.getElementById("statusarrow").innerHTML = "&raquo";
	}
};

function getPort(portNum, type){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200){
			updateStatus(this.responseText, type);
		}	
	};
	xhr.open("GET", "http://localhost:8000/port/" + portNum, true);
	xhr.send();
};

function checkPorts(){
	getPort('9200', 'es');
	getPort('5601', 'kb');
};

function updateStatus(resp, type){
	if(type == 'es'){
		es_status = resp;
		if(es_status == 'open'){
			document.getElementById('esport').classList.remove('textbad');
			document.getElementById('esport').classList.add('textgood');
		}else{
			document.getElementById('esport').classList.remove('textgood');
			document.getElementById('esport').classList.add('textbad');
		}
	}
	else if(type == 'kb'){
		kib_status = resp;
		if(kib_status == 'open'){
			document.getElementById('kibport').classList.remove('textbad');
			document.getElementById('kibport').classList.add('textgood');
		}else{
			document.getElementById('kibport').classList.remove('textgood');
			document.getElementById('kibport').classList.add('textbad');
		}
	}

	if(es_status == 'open' && kib_status == 'open'){
		document.getElementById('portStatus').classList.remove('statusbad');
		document.getElementById('portStatus').classList.add('statusgood');
	}else{
		document.getElementById('portStatus').classList.remove('statusgood');
		document.getElementById('portStatus').classList.add('statusbad');
	}
};

checkPorts();
setInterval(function(){ checkPorts() }, 5000);
