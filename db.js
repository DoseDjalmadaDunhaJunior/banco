var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/empresa');
const Schema = mongoose.Schema

var funcionarioSchema = new Schema({

    id: { type: Number},
    nome: { type: String},
    cpf: { type: Number},
    salario: { type: Number},
    data_de_contratacao: { type: String},
    cep: { type: Number},
    rua: { type: String},
    cidade: { type: String },
  },{collection: 'funcionario'});
mongoose.model('funcionario',funcionarioSchema);
//var func = mongoose.model('funcionario')
module.exports={Mongoose:mongoose, funcionarioSchema:funcionarioSchema}


const producaoSchema = new Schema({
  data: { type: String},
  bolsa_couro_velcro: { type: Number },
  bolsa_couro_zipper: { type: Number },
  bolsa_pano_velcro: { type: Number },
  bolsa_pano_zipper: { type: Number },
},{collection: 'producao'});
mongoose.model('producao',producaoSchema);
module.exports = {Mongoose:mongoose, producaoSchema:producaoSchema}

const estoqueSchema = new Schema({
  data: { type: String},
  zipper: {type: Number},
  velcro: {type: Number},
  tiras_de_couro: {type: Number},
  tiras_de_pano: {type: Number},
  peca_de_pano: {type: Number},
  peca_de_couro: {type: Number},
},{collection: 'estoque'});
mongoose.model('estoque',estoqueSchema);
module.exports = {Mongoose:mongoose, estoqueSchema:estoqueSchema}
