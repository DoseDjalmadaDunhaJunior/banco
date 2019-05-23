var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
   var db = require("../db");
   var Users = db.Mongoose.model('funcionario', db.UserSchema, 'funcionario');
   Users.find({
     //Coloque a Query Aqui
     id:{$lt:100}
   }).lean().limit(200).exec(
      function (e, docs) {
         res.render('userlist', { "userlist": docs });
   });
});


router.get('/prodlist', function(req, res) {
   var db = require("../db");
   var Userprod = db.Mongoose.model('producao',db.userSchema,'producao');
   Userprod.find({
     //Coloque a Query Aqui


   }).limit(500).exec(
     function(e,docs){
       res.render('prodlist',{"prodlist":docs});
     });
   });

   router.get('/estoqlist', function(req, res) {
      var db = require("../db");
      var Userestoq = db.Mongoose.model('estoque',db.userSchema,'estoque');
      Userestoq.find({
        //Coloque a Query Aqui


      }).limit(500).exec(
        function(e,docs){
          res.render('estoqlist',{"estoqlist":docs});
        });
      });



module.exports = router;
