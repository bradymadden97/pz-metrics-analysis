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

//Read Config File
const config = require('./config/config.json');


//Environment
var esHost = null;
var kibanaHost = null;
var env = process.env.NODE_ENV || "development";

if(process.env.VCAP_SERVICES){
	var vcap = JSON.parse(process.env.VCAP_SERVICES);
	var userServices = vcap["user-provided"];
	esHost = userServices[0].credentials.host;
	kibanaHost = "https://" + (userServices[1].credentials.uri).replace(/http:\/\/|https:\/\//i, "");
	//Hack below -- iframe doesn't allow. Need new solution
	//+ userServices[1].credentials.username + ":" + userServices[1].credentials.password + "@" +
	
}

if(env === "development"){
	kibanaHost = "http://localhost:" + config.kibana.port;
}


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
const cookieParser = require('cookie-parser');
const _routes= require('./app/routes.js');
const app = express();
var port = process.env.PORT || config.application.port;

//Elasticsearch Setup
const es = {
	port: config.elasticsearch.port,
	index: config.elasticsearch.index,
	type: config.elasticsearch.type,
	apiVersion: config.elasticsearch.apiVersion
};
if(esHost == null){
	esHost = 'localhost:' + es.port;
}
const esclient = new elasticsearch.Client({
	host: esHost,
	apiVersion: es.apiVersion
});

//Data
var data = require('./config/data.json');

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

//SSL
function forceSSL(req, res, next){
	if (req.headers['x-forwarded-proto'] !== 'https'){
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	return next();
};
if (env === 'production'){
	app.use(forceSSL);
}


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
app.use(cookieParser());
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
	} else {
		res.redirect('/login');
	}
});
app.use('/api/login', function(req, res){
	if(req.method == "POST"){
		_routes.postLogin(req, res, base64, request, config.authentication.space);
	} else {
		res.redirect('/login');
	}
});
app.use(function(req, res, next) {
	if(!req.session.authenticated) {
		res.redirect('/login?returnTo=' + encodeURIComponent(req.url));
	} else {
		next();
	}
});


//Views
app.get("/", function(req, res){
	_routes.index(req, res, data);
});
app.get("/graph/:graphName", function(req, res){ 
	_routes.getGraph(req, res, "closed", data, kibanaHost); 
});
app.get("/logs", function(req, res){
	_routes.viewAllLogs(req, res);
});

//Api Endpoints
app.get("/api/logs/mapping", function(req, res){
	_routes.getLogsMapping(req, res, es, esclient);
});
app.get("/api/logs", function(req, res){
	_routes.getAllLogs(req, res, es, esclient);
});
app.get("/api/logs/:graphName", function(req, res){
	_routes.getLogs(req, res, data, es, esclient);
});
app.get("/api/data", function(req, res){
	_routes.getAllData(req, res, data);
});
app.get("/api/data/:graphName", function(req, res){
	_routes.getGraphData(req, res, data);
});

//Redirect Routes
app.get("/graph", function(req, res){ 
	res.redirect('/'); 
});
app.get("/api", function(req, res){
	res.redirect('/');
});

app.listen(port, function(){
	if(!process.env.port)
		console.log('Dashboard @ localhost:' + config.application.port);
});


