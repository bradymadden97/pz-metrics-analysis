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

function getCookie(name){
	var cookies = document.cookie.split(";");
	for(var i = 0; i < cookies.length; i++){
		var cookie = cookies[i].split("=");
		var key = cookie[0];
		var value = cookie[1];
		if(key == name){
			return value;
		}
	}
	return null;
};
function loadLogin(){
	var apiCookie = getCookie("api");
	if(apiCookie != null){
		document.getElementById("api").value = apiCookie;
	}
	document.getElementById("api").focus();
};

loadLogin();
