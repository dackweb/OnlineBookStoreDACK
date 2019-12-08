/*var notes = [];
exports.update = exports.create = function(key, title, body) {
    notes[key] = { title: title, body: body };
}
 
exports.read = function(key) {
    return notes[key];
}
 
exports.destroy = function(key) {
    delete notes[key];
}
 
exports.keys = function() {
    return Object.keys(notes);
}*/
//var app = express();

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'mori7890',
    password: 'shuxruri',
    database:'mysql'
  });
  con.connect((err) => {
    if(err){
      console.log('Error connecting to Dbj');
      return;
    }
    con.query("SELECT * FROM product", function (err, result, fields) {
      if (err) throw err;
      console.log('for you');
      console.log(result);
     return;
    });
  });
  
  module.exports = con;
