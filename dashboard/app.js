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
const bodyParser = require('body-parser');
const base64 = require('base-64');
const request = require('request');
const uid = require('uid-safe');
const session = require('express-session');
const _routes= require('./app/routes.js');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	genid: function(req){
		return uid.sync(18)
	},
	secret: require('crypto').randomBytes(64).toString('hex'),
	resave: false,
	cookie: {maxAge: 1000 * 60 * 30},
	saveUninitialized: false
}));
app.use('/login', function(req, res){
	if(req.method == "GET"){
		_routes.getLogin(req,res);
	}else if(req.method == "POST"){
		_routes.postLogin(req, res, base64, request);
	}
});
app.use(function(req, res, next) {
	if(!req.session.authenticated) {
		res.redirect('/login?returnTo=' + encodeURIComponent(req.url));
	} else {
		next();
	}
});


//Main Routes
app.get("/", function(req, res){
	_routes.index(req, res, data);
});
app.get("/graph/:graphName", function(req, res){ 
	_routes.getGraph(req, res, "closed", data); 
});
app.get("/logs/:graphName", function(req, res){
	_routes.getLogs(req, res, data, es, esclient);
});
app.get("/data", function(req, res){
	_routes.getAllData(req, res, data);
});
app.get("/data/:graphName", function(req, res){
	_routes.getGraphData(req, res, data);
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


