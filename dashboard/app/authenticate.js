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




const pz_login = function(api, b64, request){
	var encoded = b64.encode(api + ":");
	var headers = {
		'Authorization': 'Basic ' + encoded,
	}
	var options = {
		url: 'https://pz-gateway.int.geointservices.io/profile',
		method: 'GET',
		headers: headers
	}
	request(options, function(error, response, body){
		var = responseCode = response.statusCode;
		if(!error && reponseCode == 200){
			console.log("Authenticated!");
		}else{
			console.log("Not authenticated!");
		}
	});
	


}

module.exports = {
	pz_login: pz_login
}
