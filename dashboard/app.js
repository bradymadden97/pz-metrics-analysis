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
const portscanner = require('portscanner');
const app = express();

//Data
var graph_data = require('./graph_data.json');

//Handlebars
var hbs = exphb.create({
	defaultLayout: 'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
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

//Route functions
function index(req, res) {
	res.render('index', {
		graphNames: graph_data,
	});
};

function getGraph(req, res) {
	data = graph_data[req.params.graphName];
	defaultList = [];
	try { 
		for(var key in data['defaults'])
			defaultList.push([key, data['defaults'][key]]);
	}
	catch(e) {
		res.redirect("/");
		return;
	}
	res.render('displayGraph', {
		defaults: defaultList,
		eps: data['defaults']['endpoints'],
		eps_links: data['linkHelpers'],
		graphName: req.params.graphName,
		link: data['link'],
		params: data['params'],
		paramlength: data['params'].length + 1,
	});
};

function getAllData(req, res) {
	res.send(graph_data);
};

function getGraphData(req, res) {
	res.send(graph_data[req.params.graphName]);
};

function getPortStatus(req, res) {
	portscanner.checkPortStatus(req.params.portNumber, '127.0.0.1', function(error, status) {
		res.send(status);
	});
};

//Main Routes
app.get("/", function(req, res){ 
	index(req, res); 
});
app.get("/graph/view/:graphName", function(req, res){ 
	getGraph(req, res); 
});
app.get("/data", function(req, res){
	getAllData(req, res);
});
app.get("/data/:graphName", function(req, res){
	getGraphData(req, res);
});
app.get("/port/:portNumber", function(req, res){
	getPortStatus(req, res);
});

//Redirect Routes
app.get("/graph", function(req, res){ 
	res.redirect('/'); 
});
app.get("/graph/view", function(req, res){ 
	res.redirect('/'); 
});
app.get("/graph/:graphName", function(req, res){ 
	res.redirect('/graph/view/' + req.params.graphName); 
});


app.listen(8000, function(){
	console.log('Dashboard @ localhost:8000');
});


