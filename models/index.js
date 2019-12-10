var con = require('./db')
const mysql = require('mysql');

module.exports.getAllValue = async()=>
{ 
 
   return await new Promise((resolve, reject) => con.query('SELECT * FROM product LIMIT 8', (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
   
}
module.exports.getName = async function (req,res)
{
   
  return await new Promise((resolve, reject) => con.query("SELECT * FROM product WHERE name like '%"+req.query.name+"%'", (err, results) => {
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
module.exports.test =  async function (req,res)
{
  return await new Promise((resolve, reject) =>{
   
  var numRows;
  
  var numPerPage = 8;
  var page = parseInt(req.query.page,10) || 1;
  var numPages;
  var skip = (page-1) * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query

  var limit = skip + ',' + numPerPage;
 con.query('SELECT count(*) as numRows FROM product',function(err,results) {
  if (err) {
    reject(err);}
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
   
    
    console.log('pages:'+ page);
    console.log('number of pages:'+ numPages);
    console.log('npp is '+req.query.npp);
    con.query('SELECT * FROM product ORDER BY ID LIMIT ' + limit,function(err,results) {
      if (err) {
        reject(err);}
      var responsePayload = {
        results: results,
        sumPage: numPages
      };
     
        responsePayload.pagination = {
          current: page,
          perPage: numPerPage,
          previous: page > 0 ? page - 1 : undefined,
          next: page < numPages - 1 ? page + 1 : undefined
        }
     
      resolve(responsePayload);
    })
  })
 
  
})
}
module.exports.getCostQuery =  async function (req,res)
{
  return await new Promise((resolve) =>{
     if(req.query.test2 =="1")
    {
      var sqlQuery = "SELECT * FROM product ";
      resolve(sqlQuery);
    }
    else if(req.query.test2 =="2"){
    var sqlQuery = "SELECT * FROM product WHERE price < 50000";
    resolve(sqlQuery);
    }
    else if(req.query.test2 =="3")
    {
      var sqlQuery = "SELECT * FROM product WHERE price >= 50000 and price <100000";
      resolve(sqlQuery);
    }
    else if(req.query.test2 =="4")
    {
      var sqlQuery = "SELECT * FROM product WHERE price >= 100000 and price 200000";
      resolve(sqlQuery);
    }
    else 
    {
      var sqlQuery = "SELECT * FROM product WHERE price >= 200000";
      resolve(sqlQuery);
    }
  });
 
}
module.exports.getTypeQuery =  async function (req,res)
{
  return await new Promise((resolve,reject) =>{
     if(req.query.test =="1")
     {
      var sqlQuery = "SELECT * FROM product ";
      resolve(sqlQuery);
    }
    
    else 
    {var sqlQuery ='SELECT * FROM product WHERE type = '+mysql.escape(req.query.test);
    resolve(sqlQuery);
  }
});
 
}
module.exports.getAuthorQuery = async  function (req,res)
{
  return await new Promise((resolve,reject) =>{
      if(req.query.author != undefined)
      {
       var sqlQuery = "SELECT * FROM product WHERE author like '%"+req.query.author+"%'";
        
        resolve(sqlQuery);
      }
      else
      {
        var sqlQuery = "SELECT * FROM product ";
        resolve(sqlQuery);
      }

    });  
    
}
module.exports.filter = async function(req,res)
{
  return await new Promise(async (resolve,reject) =>{
  var res1 = await this.getAuthorQuery(req,res);
  
  var res2 = await this.getTypeQuery(req,res);
  var res3 =await  this.getCostQuery(req,res);
  console.log(res1+' INTERSECT '+res2+' INTERSECT '+res3);
  con.query(res1+' INTERSECT '+res2+' INTERSECT '+res3,(err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
    
  })

});
}