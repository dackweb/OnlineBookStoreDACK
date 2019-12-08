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
module.exports.UpdateConfirmStatus = async function (req,res)
{
  
   con.query('UPDATE users SET confirmed = 1 WHERE username ='+mysql.escape(req.params.id));

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
module.exports.sendEmail = async function (req,res)
{
  
}
module.exports.test =  function (req,res)
{
  var numRows;
  
  var numPerPage = parseInt(req.query.npp, 3) || 1;
  var page = parseInt(req.query.page, 2) || 0;
  var numPages;
  var skip = page * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query

  var limit = skip + ',' + numPerPage;
 con.query('SELECT count(*) as numRows FROM product',function(results) {
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
    console.log('number of pages:', numPages);
    con.query('SELECT * FROM wp_posts ORDER BY ID DESC LIMIT ' + limit,function(results) {
      var responsePayload = {
        results: results
      };
      if (page < numPages) {
        responsePayload.pagination = {
          current: page,
          perPage: numPerPage,
          previous: page > 0 ? page - 1 : undefined,
          next: page < numPages - 1 ? page + 1 : undefined
        }
      }
      else responsePayload.pagination = {
        err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
      }
      res.json(responsePayload);
    })
  })
  
 
}