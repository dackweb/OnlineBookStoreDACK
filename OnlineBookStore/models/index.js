var con = require('./db')
const mysql = require('mysql');
module.exports.getAllValue = async()=>
{ 
 
   return await new Promise((resolve, reject) => con.query('SELECT * FROM product', (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
   
}
 
module.exports.getAuthor = async function (req,res)
{
   
  return await new Promise((resolve, reject) => con.query('SELECT * FROM product WHERE author ='+mysql.escape(req.params.id), (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
}
module.exports.getType = async function (req,res)
{
   
  return await new Promise((resolve, reject) => con.query('SELECT * FROM product WHERE type ='+mysql.escape(req.params.id), (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
}
module.exports.getID = async function (req,res)
{
   
  return await new Promise((resolve, reject) => con.query('SELECT * FROM product WHERE id ='+mysql.escape(req.params.id), (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
}
module.exports.getUsername = async function (req,res)
{
   
  return await new Promise((resolve, reject) => con.query('SELECT * FROM users WHERE username ='+mysql.escape(req.params.id), (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
}
