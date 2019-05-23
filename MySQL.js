var mysql = require('mysql');

var con = mysql.createConnection({
    host: "root",
    user: "myusername",
    password: "23081998",
    database: "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT producao.data AS user, estoque.data AS favorite FROM producao JOIN estoque ON producao.data = estoque.data";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});