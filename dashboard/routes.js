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
		logs: logData.logs
	});
};

const getLogs = function(req, res, data, es, esclient){
	var logs_data = data[req.params.graphName]["logs"];
	var logs_query = logs_data["body"];
	var count = 10;
	var page = 0;
	var extraParams = {};
	if(req.query.page) page = req.query.page;
	if(req.query.count) count = req.query.count;
	if(req.query.actor) extraParams.actor = req.query.actor;
	if(req.query.timeRange) extraParams.timeRange = req.query.timeRange;

	logs_query.size = count;
	logs_query.from = count * page;
	if(extraParams.actor) logs_query.query.bool.must[1].match["auditData.actor"] = extraParams.actor;
	if(extraParams.timeRange) logs_query.query.bool.must[logs_query.query.bool.must.length - 1].range.timeStamp.gte = "now-" + extraParams.timeRange;
	esclient.search({
		index: es.index,
		type: es.type,
		body: logs_query
	}).then(function(resp) {
		resp.hits.page = page;
		resp.hits.size = count;
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



//Export functions to app.js
module.exports = {
	index: index,
	getGraph: getGraph,
	getLogs: getLogs,
	getAllData: getAllData,
	getGraphData: getGraphData
}
