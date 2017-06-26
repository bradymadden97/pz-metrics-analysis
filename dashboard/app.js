const express = require('express');
const path = require('path');
const app = express();

var graph_data = require('./graph_data.json');

app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get("/graph/:graphName", function(req, res) {
	//Add in handlebars
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
