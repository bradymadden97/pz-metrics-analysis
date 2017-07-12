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

//Consts and Imports
const express = require('express');
const exphb = 	require('express-handlebars');
const path = require('path');
const elasticsearch = require('elasticsearch');
const app = express();

//Elasticsearch Setup
const es = {
	port: "9200",
	index: "pzlogger5",
	type: "LogData",
	apiVersion: "2.4"
};
const esclient = new elasticsearch.Client({
	host: 'localhost:' + es.port,
	apiVersion: es.apiVersion
});

//Data
var data = require('./data.json');

//Handlebars
var hbs = exphb.create({
	defaultLayout: 'main',
	helpers: {
		json: function(context){
			return JSON.stringify(context);
		},
		section: function(name, options){
			if(!this._sections){
				this._sections = {};
			}
			if(name in this._sections){
				this._sections[name] = this._sections[name] + options.fn(this);
			}else{
				this._sections[name] = options.fn(this)
			}
			return null;
		},
		paramlist: function(arg) {
			return arg;
		}
	},
	partialsDir: __dirname + '/views/partials/'
});

//Setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1));
	else
		next();
});

//Route functions
function index(req, res) {
	res.render('index', {
		graphNames: Object.keys(data)
	});
};

function getGraph(req, res, logData) {
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

function getLogs(req, res){
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

function getAllData(req, res) {
	res.send(data);
};

function getGraphData(req, res) {
	res.send(data[req.params.graphName]['graph']);
};


//Main Routes
app.get("/", function(req, res){ 
	index(req, res); 
});
app.get("/graph/:graphName", function(req, res){ 
	getGraph(req, res, "closed"); 
});
app.get("/logs/:graphName", function(req, res){
	getLogs(req, res);
});
app.get("/data", function(req, res){
	getAllData(req, res);
});
app.get("/data/:graphName", function(req, res){
	getGraphData(req, res);
});


//Redirect Routes
app.get("/graph", function(req, res){ 
	res.redirect('/'); 
});
app.get("/logs", function(req, res){
	res.redirect('/');
});


app.listen(8000, function(){
	console.log('Dashboard @ localhost:8000');
});


