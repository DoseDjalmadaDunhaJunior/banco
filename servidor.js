var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost/Exemplo1");

var produtoSchema = new mongoose.Schema({
    dbnome: "String",
    dbmarca: "String",
    dbquantidade: "Number"
});
var produtoModel = mongoose.model("produtos", produtoSchema);


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get(["/", "/principal"], function(req, resp){
    resp.render("principal");
});

app.get("/cadastra", function(req, resp){
	resp.render("Cadastra");
});


app.post("/cadastra", function(req, resp){
    var nome = req.body.nome;
    var marca = req.body.marca;
    var quant = req.body.quantidade;

    var novo = new produtoModel({
        dbnome: nome,
        dbmarca: marca,
        dbquantidade: quant
    });

    novo.save();
    var msg = "Produto cadastrado!";
    resp.render("mensagem", {mensagem: msg});
});

app.get("/buscar", function(req, resp){

	produtoModel.collection.distinct("dbmarca", function(error, results){
		if(results.length == 0 )
			resp.render("mensagem", {mensagem: "Nenhum produto encontrado!"})
		else
			resp.render("Busca", {produtos: results});
	});
});

app.get("/mongo", function (req,resp) {
    produtoModel.collection.distinct("produtos", function(error, results) {
        resp.render("mongo",{produtos: results})
    });
});

app.post("/mongo", function (req,resp){
    produtoModel.collection.distinct("produto", function(error, results) {
        console.log(results.length)
        if(objs.length == 0){
            resp.render("mensagem", {mensagem: "Nenhum produto encontrado!"})
        }
        else{
            resp.render("listagem", {produtos: results});
        }
        resp.render("listagem", {produtos: results})
    });
});

app.post("/buscar", function(req, resp){
    var marca_busca = req.body.marca;
    produtoModel.find({ dbmarca: marca_busca}, function(err, objs){
        console.log(objs.length)
        if(objs.length == 0){
            resp.render("mensagem", {mensagem: "Nenhum produto encontrado!"})
        }
        else
        {
            resp.render("listagem", {produtos: objs});
        }
    });
});

app.get("/deleta", function(req, resp){
	produtoModel.collection.distinct("dbnome", function(error, results){
		if(results.length == 0 )
			resp.render("mensagem", {mensagem: "Nenhum produto encontrado!"})
		else
			resp.render("deleta", {produtos: results});
	});    
});

app.post("/deletar", function(req, resp){
    var nome = req.body.nome;
    produtoModel.remove({ dbnome: nome}, function(err, objs){
        if(objs.n == 0){
				resp.render("mensagem", {mensagem: "Nenhum produto encontrado!"})
        }
        else
        {
            resp.render("mensagem", {mensagem: "Produto deletado!"});
        }
    });
});

var servidor = http.createServer(app);
servidor.listen(8070);

