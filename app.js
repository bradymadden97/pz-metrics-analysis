const express = require('express');
const app = express();
const path = require('path');

var graph_data = require("./graph_data.json")

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8000, function(){
	console.log('Dashboard @ localhost:8000');
});
