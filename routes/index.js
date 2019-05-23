var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
   var db = require("../db");
   var Users = db.Mongoose.model('funcionario', db.UserSchema, 'funcionario');
   Users.find({}).lean().exec(
      function (e, docs) {
         res.render('userlist', { "userlist": docs });
   });
});
module.exports = router;
