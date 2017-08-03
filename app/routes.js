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

//Route functions
const _auth = require('./authenticate.js');

const index = function(req, res, data) {
	res.render('index', {
		graphNames: Object.keys(data),
		title: "Pz-Metrics Dashboard"
	});
};

const getGraph = function(req, res, logData, data) {
	var graph_data = data[req.params.graphName]["graph"];
	defaultList = [];
	try { 
		for(var key in graph_data['default'])
			defaultList.push([key, graph_data['default'][key]]);
	}
	catch(e) {
		res.redirect("/");
		return;
	}
	res.render('graph', {
		title: req.params.graphName,
		graph_data: graph_data,
		graph_name: req.params.graphName,
		defaults: defaultList,
		eps: graph_data['default']['endpoints'],
		eps_links: graph_data['linkHelpers'],
		link: graph_data['link'],
		params: graph_data['params'],
		paramlength: graph_data['params'].length + 1,
		logShow: logData.show,
		logs: logData.logs,
		scripts: graph_data['scripts']
	});
};

const getLogs = function(req, res, data, es, esclient){
	var logs_data = data[req.params.graphName]["logs"];
	var logs_query = logs_data["body"];
	var logs_params = {
		count: 10,
		page: 0
	}
	for(var key in req.query){
		logs_params[key] = req.query[key];
	}

	logs_query.size = logs_params.count;
	logs_query.from = logs_params.count * logs_params.page;
	if(logs_params.actor) logs_query.query.bool.must[1].match["auditData.actor"] = logs_params.actor;
	if(logs_params.timeRange) logs_query.query.bool.must[logs_query.query.bool.must.length - 1].range.timeStamp.gte = "now-" + logs_params.timeRange;
	esclient.search({
		index: es.index,
		type: es.type,
		body: logs_query
	}).then(function(resp) {
		resp.hits.page = logs_params.page;
		resp.hits.size = logs_params.count;
		res.send(resp.hits);
	}, function(err) {
		console.log(err.message);
	});
};

const getAllData = function(req, res, data) {
	res.send(data);
};

const getGraphData = function(req, res, data) {
	res.send(data[req.params.graphName]['graph']);
};

const getLogin = function(req, res){
	res.render('login', {
		title: "Pz-metrics Login",
		error: req.query.e
	});
};

const postLogin = function(req, res, b64, request, space){
	_auth.pz_login(req, res, b64, request, space);
};

const getAllLogs = function(req, res, es, esclient){
	var log_params = {
		count: 25,
		page: 0
	};
	for(var key in req.query){
		log_params[key] = req.query[key];
	}
	var query = {
		"from": log_params.count * log_params.page,
		"sort": [
			{
				"timeStamp": "desc"
			}
		],
		"size": log_params.count
	};
	esclient.search({
		index: es.index,
		type: es.type,
		body: query
	}).then(function(resp) {
		resp.hits.page = log_params.page;
		resp.hits.size = log_params.count;
		res.send(resp.hits);
	}, function(err) {
		console.log(err.message);
	});
};

const getLogsMapping = function(req, res, es, esclient){
	esclient.indices.getMapping({
		index: es.index,
		type: es.type
	}).then(function(resp) {
		res.send(resp[es.index].mappings[es.type].properties);
	}, function(err) {
		console.log(err.message);
	});
};

const viewAllLogs = function(req, res){
	res.render('logs', {
		title: "Pz-metrics Logs"

	});

};


//Export functions to app.js
module.exports = {
	index: index,
	getGraph: getGraph,
	getLogs: getLogs,
	getAllData: getAllData,
	getGraphData: getGraphData,
	getLogin: getLogin,
	postLogin: postLogin,
	getAllLogs: getAllLogs,
	viewAllLogs: viewAllLogs,
	getLogsMapping: getLogsMapping
}
