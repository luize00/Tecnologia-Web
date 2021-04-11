var express = require("express");
var cors = require('cors');
var app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	user: 'root',
	password: "21038930",
	database: "tecweb"
});	

app.use(cors());
app.use(express.json());

app.get("/veiculo", (req,resp) => {
	console.log("GET - Veiculo");
	
	connection.query("SELECT * FROM veiculo", (err, result) => {
		if(err) {
			console.log(err);
			resp.status(500).end();
		} else {
			resp.json(result);
			resp.status(200).end();
		}
	});
});

app.post("/veiculo", (req, resp) => {
	var veiculo = req.body;
	console.log("POST - veiculo");
	
	connection.query("INSERT INTO veiculo SET ?", [veiculo], (err,result) =>{
		if(err) {
			console.log(err);
			resp.status(500).end();
		} else {
			resp.json(result.insertedId);
			resp.status(200).end();
		}	
	});	
});

app.get("/veiculo/:veiculoId", (req, resp) => {
	var veiculoId = req.params.veiculoId;
	console.log("GET - VeiculoId:" + veiculoId);
	
	
	connection.query("SELECT * FROM veiculo WHERE id = ?", [veiculoId], (err,result) => {
		if(err) {
			console.log(err);
			resp.status(500).end();
		} else {
			resp.json(result);
			resp.status(200).end();
		}	
	});
});

app.put("/veiculo/:veiculoId", (req, resp) => {
	var veiculoId = req.params.veiculoId;
	var veiculo = req.body;
	console.log("PUT - VeiculoId:" + veiculoId);
	
	connection.query("UPDATE veiculo SET ? WHERE id = ?", [veiculo, veiculoId], (err,result) => {
		if(err) {
			console.log(err);
			resp.status(500).end();
		} else {
			resp.json(result);
			resp.status(200).end();
		}
	});
});

app.delete("/veiculo/:veiculoId", (req, resp) => {
	var veiculoId = req.params.veiculoId;
	console.log("DELETE - VeiculoId:" + veiculoId);
	
	connection.query("DELETE FROM veiculo WHERE id = ?", [veiculoId], (err,result) => {
		if(err) {
			console.log(err);
			resp.status(500).end();
		} else {
			resp.status(200).end();
		}
	});
	
});

app.listen(3000, () => {
	console.log('Locacar BH - Port 3000:');
});
