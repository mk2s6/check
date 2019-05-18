var express = require('express');
var bp = require('body-parser');
var mysql = require('mysql');
var http = require('http');
var app = express();

app.listen(3031, function() {
	console.log("Server listning at port 3031");
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'mk2s',
	// port: '1000',
	password: 'kusumanjali',
	database : 'siva',
});

connection.connect();

 var orders = [];

function insert(order) {
	query = connection.query('INSERT INTO orders SET ?', order, function(err, result){
		if (err) {
			throw err;
		} 
	});
}

app.use(express.static(__dirname));
app.use(bp.json());

app.get('/orders', function(req , res){
	query = connection.query('SELECT * FROM orders;', function(err, result) {
		if(err) throw err;
		else {
			var string = JSON.stringify(result);
			var json = JSON.parse(string);
			res.send({orders : json});
		}
	});
});

app.post('/orders', function(req, res) {
	var newName = req.body.name;
	var newDrink = req.body.drink;
	orders = {
		Name: newName,
		drink:newDrink
	}
	insert(orders);
	res.send("Success");
});

app.delete('/orders/:id', function (req, res) {
	var id = req.params.id;
	query = connection.query('DELETE FROM orders WHERE id = ?', id , function (err, result) {
		if (err) {
			res.send("Delete unsuccesfull");
			throw err;
		}
	});
	res.send("Delete success");

});