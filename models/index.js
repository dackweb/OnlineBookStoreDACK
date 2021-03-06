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
module.exports.getType2 = async function (type)
{
   
  return await new Promise((resolve, reject) => con.query('SELECT * FROM product WHERE type ='+mysql.escape(type)+'LIMIT 4', (err, results) => {
    if (err) {
      reject(err)
    } else {
      resolve(results);
    }
  }));
}
module.exports.UpdateConfirmStatus = async function (req,res)
{
  
   con.query('UPDATE users SET confirmed = 1 WHERE email ='+mysql.escape(req.params.id));

}
module.exports.getID = async function (id)
{
   
  return await new Promise((resolve, reject) => con.query('SELECT * FROM product WHERE id ='+id, (err, results) => {
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
module.exports.shop =  async function (req,res)
{
  return await new Promise((resolve, reject) =>{
   
  var numRows;
  
  var numPerPage = 8;
  var page = parseInt(req.query.page,10) || 1;
  var numPages;
  var skip = (page-1) * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query

  var limit = skip + ',' + numPerPage;
  console.log(limit);
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
module.exports.test2 =  async function (req,res)
{
  return await new Promise((resolve, reject) =>{
   
  var numRows;
  
  var numPerPage = 8;
  var page = parseInt(req.query.page,10) || 1;
  var numPages;
  var skip = (page-1) * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query

  var limit = skip + ',' + numPerPage;

 con.query('SELECT count(*) as numRows FROM product WHERE ',function(err,results) {
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
     if(req.query.price =="1")
    {
      var sqlQuery = "";
      resolve(sqlQuery);
    }
    else if(req.query.price =="2"){
    var sqlQuery = "and price < 50000";
    resolve(sqlQuery);
    }
    else if(req.query.price =="3")
    {
      var sqlQuery = "and price >= 50000 and price <100000";
      resolve(sqlQuery);
    }
    else if(req.query.price =="4")
    {
      var sqlQuery = "and price >= 100000 and price 200000";
      resolve(sqlQuery);
    }
    else 
    {
      var sqlQuery = "and WHERE price >= 200000";
      resolve(sqlQuery);
    }
  });
 
}
module.exports.getTypeQuery =  async function (req,res)
{
  return await new Promise((resolve,reject) =>{
     if(req.query.type =="1")
     {
      var sqlQuery = "";
      resolve(sqlQuery);
    }
    
    else 
    {var sqlQuery ='and type = '+mysql.escape(req.query.type);
    resolve(sqlQuery);
  }
});
 
}
module.exports.getSortQuery =  async function (req,res)
{
  return await new Promise((resolve,reject) =>{
     if(req.query.value =="1")
     {
      var sqlQuery = "";
      resolve(sqlQuery);
    }
    
    else if(req.query.value =="2")
    {
     var sqlQuery = "ORDER BY name ASC";
     resolve(sqlQuery);
   }
   else if(req.query.value =="3")
    {
      var sqlQuery = "ORDER BY name DESC";
     resolve(sqlQuery);
   }
   else if(req.query.value =="4")
    {
      var sqlQuery = "ORDER BY price ASC";
     resolve(sqlQuery);
   }
   else if(req.query.value =="5")
    {
      var sqlQuery = "ORDER BY price DESC";
     resolve(sqlQuery);
   }
   else if(req.query.value =="6")
    {
      var sqlQuery = "ORDER BY id DESC";
     resolve(sqlQuery);
   }
  
});
 
}
module.exports.searchName = async function(req,res)
{
  return await new Promise((resolve, reject) =>{
   
    var numRows;
    
    var numPerPage = 4;
    var page = parseInt(req.query.page,10) || 1;
    var numPages;
    var skip = (page-1) * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
  
    var limit = skip + ',' + numPerPage;
    console.log(limit);
   con.query("SELECT count(*) as numRows FROM product WHERE name like '%"+req.query.name+"%'",function(err,results) {
    if (err) {
      reject(err);}
      numRows = results[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
     
      
      console.log('pages:'+ page);
      console.log('number of pages:'+ numPages);
      console.log('npp is '+req.query.npp);
      con.query("SELECT * FROM product WHERE name like '%"+req.query.name+"%' ORDER BY ID LIMIT " + limit,function(err,results) {
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
module.exports.filter = async function(req,res)
{
  return await new Promise(async (resolve,reject) =>{
    var numRows;
  
  var numPerPage = 4;
  var page = parseInt(req.query.page,10) || 1;
  var numPages;
  var skip = (page-1) * numPerPage;
  var limit = skip + ',' + numPerPage;
  var typeQuery = await this.getTypeQuery(req,res);
  var priceQuery = await this.getCostQuery(req,res);
  var sort = await this.getSortQuery(req,res);
  //var sql = "SELECT count(*) as numRows FROM product where author like '%"+req.query.author+"%' "+typeQuery+priceQuery;
  
  con.query("SELECT count(*) as numRows FROM product where author like '%"+req.query.author+"%' "+typeQuery+priceQuery,function(err,results) {
    if (err) {
      reject(err);}
      numRows = results[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
      console.log('limit is'+limit);
      var stupidquery = "SELECT * FROM product where author like '%"+req.query.author+"%' "+typeQuery+" " +priceQuery+" "+sort+" LIMIT "+limit;
      console.log(stupidquery);
  con.query("SELECT * FROM product where author like '%"+req.query.author+"%' "+typeQuery+" " +priceQuery+" "+sort+" LIMIT "+limit,(err, results) => {
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
   console.log(responsePayload.results);
    resolve(responsePayload);
  });
  })

});
}
module.exports.addCMT =async  function(req,res)
{
  return await new Promise(async (resolve,reject) =>{
    con.query('SELECT * FROM users WHERE id ='+req.body.userid,function(err,user){ 
      if(err)
        reject(err);
     
      

      con.query('INSERT into cmt(userID,productID,username,content,img) value(?,?,?,?,?)',
      [user[0].id,req.body.cmtid,user[0].username,req.body.cmt,user[0].img],function(err,result)
        {
          if(err)
            reject(err);
          resolve(result);

        })
      })
    })
}

module.exports.getCmt = async function (req)
{
   
  return await new Promise((resolve, reject) =>{
   
    var numRows;
    
    var numPerPage = 4;
    var page = parseInt(req.query.page,10) || 1;
    var numPages;
    var skip = (page-1) * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
  
    var limit = skip + ',' + numPerPage;
    console.log(limit);
   con.query('SELECT count(*) as numRows FROM cmt WHERE productID ='+mysql.escape(req.query.id),function(err,results) {
    if (err) {
      reject(err);}
      numRows = results[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
     
      
      console.log('pages:'+ page);
      console.log('number of pages:'+ numPages);
    
      con.query('SELECT * FROM cmt WHERE productID = '+mysql.escape(req.query.id)+' ORDER BY date DESC LIMIT ' + limit,function(err,results) {
        if (err) {
          reject(err);}
          console.log(results);
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
module.exports.getCmt2 = async function (req)
{
   
  return await new Promise((resolve, reject) =>{
   
    var numRows;
    
    var numPerPage = 4;
    var page = parseInt(req.query.page,10) || 1;
    var numPages;
    var skip = (page-1) * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
  
    var limit = skip + ',' + numPerPage;
    console.log(limit);
   con.query('SELECT count(*) as numRows FROM cmt WHERE productID ='+mysql.escape(req.params.id),function(err,results) {
    if (err) {
      reject(err);}
      numRows = results[0].numRows;
      numPages = Math.ceil(numRows / numPerPage);
     
      
      console.log('pages:'+ page);
      console.log('number of pages:'+ numPages);
    
      con.query('SELECT * FROM cmt WHERE productID = '+mysql.escape(req.params.id)+' ORDER BY date DESC LIMIT ' + limit,function(err,results) {
        if (err) {
          reject(err);}
          console.log(results);
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
module.exports.getCmtPagination =  async function (req,res)
{
  return await new Promise((resolve, reject) =>{
   
  var numRows;
  
  var numPerPage = 4;
  var page = parseInt(req.query.page,10) || 1;
  var numPages;
  var skip = (page-1) * numPerPage;
  // Here we compute the LIMIT parameter for MySQL query

  var limit = skip + ',' + numPerPage;
  console.log(limit);
 con.query('SELECT count(*) as numRows FROM cmt where ID = '+mysql.escape(req.params.id),function(err,results) {
  if (err) {
    reject(err);}
    numRows = results[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
   
    
    console.log('pages:'+ page);
    console.log('number of pages:'+ numPages);
    console.log('npp is '+req.query.npp);
    con.query('SELECT * FROM product ORDER BY date LIMIT ' + limit,function(err,results) {
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
module.exports.updateViews =async function(req,res)
{
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM product WHERE id = '+mysql.escape(req.params.id),
 async (err, results) => {
    if (err) {
      reject(err)
    } else {
     
     
      con.query('UPDATE product SET countViews = ? WHERE id = ?',
      [results[0].countViews+1,req.params.id],async (err, result) => {
        if (err) {
          reject(err)
        } else {
         
         console.log(results[0].countViews+1);
         
         resolve(results[0].countViews+1);
        }
      })
      
    }
  })
});

}
module.exports.updateBuys =async function(id,number)
{
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM product WHERE id = '+id,
 async (err, results) => {
    if (err) {
      reject(err)
    } else {
      
      con.query('UPDATE product SET countBuys = ? WHERE id = ?',
      [results[0].countBuys+number,id], (err, result) => {
        if (err) {
          reject(err)
        } else {
         // console.log(results);
         
          resolve(results[0].countBuys+number);
        }
      })
      
    }
  })
});

}
module.exports.viewHistory =async function(req,res)
{
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM history WHERE userID = '+req.user.id,
  (err, results) => {
    if (err) {
      reject(err)
    } resolve(results);
  })
});

}
module.exports.viewOrderDetail =async function(req,res)
{
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM orderdetail WHERE orderID = '+req.params.id,
  (err, results) => {
    if (err) {
      reject(err)
    } resolve(results);
  })
});

}