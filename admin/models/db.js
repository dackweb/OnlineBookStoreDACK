
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'user'
  });
  con.connect((err) => {
    if(err){
      console.log('Error connecting to Dbj');
      return;
    }
  });
  
  module.exports = con;
