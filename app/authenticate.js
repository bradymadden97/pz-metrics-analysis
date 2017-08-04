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




const pz_login = function(req, res, b64, request, space){
	var redirect = "%2F"
	if(req.body.returnTo){
		redirect = encodeURIComponent(req.body.returnTo);
	}
	var encoded = b64.encode(req.body.api + ":");
	var headers = {
		'Authorization': 'Basic ' + encoded,
	}
	if(space != "" || space != "prod")
		space = space + ".";
	var options = {
		url: `https://pz-gateway.${space}geointservices.io/profile`,
		method: 'GET',
		headers: headers
	}
	request(options, function(error, response, body){
		var responseCode = response.statusCode;

		if(!error && responseCode == 200){
			console.log("Authenticated!");
			req.session.api = req.body.api;
			req.session.authenticated = true;
			res.cookie("api", req.body.api, {maxAge: 1000*60*60*24*30});
			res.redirect(301, decodeURIComponent(redirect));
		}else{
			console.log("Not authenticated!");
			req.session.api = req.body.api;
			req.session.authenticated = false;
			clearCookie("api");
			res.redirect(301, '/login?e=true&returnTo=' + redirect)
		}
	});
}

module.exports = {
	pz_login: pz_login
}
