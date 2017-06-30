//Consts and Imports
const express = require('express');
const exphb = 	require('express-handlebars');
const path = require('path');
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


