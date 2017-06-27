const express = require('express');
const exphb = 	require('express-handlebars');
const path = require('path');
const app = express();

var graph_data = require('./graph_data.json');
var hbs = exphb.create({
	defaultLayout: 'main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	},
	partialsDir: __dirname + '/views/partials/'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get("/graph/:graphName", function(req, res) {
	data = graph_data[req.params.graphName];
	res.render('displayGraph', {
		graphName: req.params.graphName,
		params: data.params, //Determine how to insert in loop? into displayGraph.handlebars
	});
});
app.get("/data", function(req, res) {
	res.send(graph_data);
});
app.get("/data/:graphName", function(req, res) {
	res.send(graph_data[req.params.graphName])
});

app.listen(8000, function(){
	console.log('Dashboard @ localhost:8000');
});