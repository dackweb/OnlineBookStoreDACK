var con = require('./db')
const mysql = require('mysql');
var index = require('./index')
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
/*var items=[];
module.exports.addAnoMyous = function(req,res)
{
  
      items.push(req.params.id);
      
      localStorage.setItem("item", JSON.stringify(req.params.id));
      console.log('done');
     
}

module.exports.seeCart= function(req,res)
{
  
    var test = JSON.parse(localStorage.getItem("item"));
    console.log(items);
    console.log('pass');
    console.log(test);
  return test;
   
  
}
module.exports.addOrder= async function(req,res)
{
  return await new Promise(async (resolve,reject) =>{
    
  
    con.query('SELECT * FROM cart WHERE id = '+mysql.escape(req.params.id),  function(err,result)
    {
      if(err)
      reject(err);
      if(result[0]==undefined)
      {
        con.query('SELECT * FROM product WHERE id = '+mysql.escape(req.params.id), function(err,result)
          {
            if(err)
              reject(err);
     
        var InsertQuery = "INSERT INTO cart(id,number,price,type) values (?,?,?,?)";
        con.query(InsertQuery,[result[0].id,1,result[0].price,result[0].type],function(err,results)
          {
            if(err)
              reject(err);
            resolve(results);
          });


        })
        }
        else{
          con.query("update cart set number = ? WHERE id = ?",[result[0].number+1,result[0].id],function(err,results)
          {
            if(err)
              reject(err);
            resolve(results);
          });
            }
})
})
  
}*/

module.exports.addAnoMyous = function(req,res)
{
  
  var temp =localStorage.getItem(req.params.id);
      if(temp!=undefined)
      {
        
        localStorage.setItem(req.params.id,parseInt(temp)+1);
        
      }
      else
      {
        
      localStorage.setItem(req.params.id, 1);
     
      }
     
}

module.exports.seeCart= function(req,res)
{
  
  for (var i = 0; i < localStorage.length; i++) {

    // set iteration key name
    var key = localStorage.key(i);
  
    // use key name to retrieve the corresponding value
    var value = localStorage.getItem(key);
  
    // console.log the iteration key and value
    console.log('Key: ' + key + ', Value: ' + value);  
  
  }
   
  
}
module.exports.asyncTransfer=async function(req,key)
{
  
  return await new Promise(async (resolve,reject) =>{
  con.query('SELECT * FROM product WHERE id = '+mysql.escape(key),  function(err,result)
  {
    if(err)
    reject(err);
    
   
    con.query('SELECT * FROM cart WHERE id = '+mysql.escape(key)+' and userID = '+req.user.id,function(err,res)
    {
      if(err)
        reject(err);
        if(res[0] != undefined)
        {
         
          var sum = parseInt(res[0].number)+parseInt(localStorage.getItem(key));
          var Query = 'UPDATE cart SET number = '+sum+ ' WHERE id = '+ mysql.escape(key)+' and userID = '+req.user.id;
          console.log(stupidQuery);
         
          con.query(Query,function(err,results)
          {
            if(err)
              reject(err);
          });
        }
        else{
          console.log('number are'+ localStorage.getItem(key));
          var InsertQuery = "INSERT INTO cart(id,number,price,type,img,userID) values (?,?,?,?,?,?)";
          con.query(InsertQuery,[result[0].id,localStorage.getItem(key),result[0].price,result[0].type,result[0].img,req.user.id],function(err,results)
            {
              if(err)
                reject(err);
            });
          
        }
        localStorage.removeItem(key);
        console.log('key is '+key);
        
        resolve(result);
      })
    })
    });
}
module.exports.asyncTransferBuy=async function(orderID,result)
{
  
  return await new Promise(async (resolve,reject) =>{

   
   
      var InsertQuery = "INSERT INTO orderdetail(productID,number,price,img,orderID) values (?,?,?,?,?)";
      con.query(InsertQuery,[result.id,result.number,result.price,result.img,orderID],function(err,results)
        {
          if(err)
            reject(err);
         
            resolve(results);
        });

        
      })
      
   
}
module.exports.TransferHistory=async function(req,res)
{
  
  return await new Promise(async (resolve,reject) =>{
 
      var InsertQuery = "INSERT INTO history(userID,price) values (?,?)";
      con.query(InsertQuery,[req.user.id,req.params.id],function(err,results)
        {
          if(err)
            reject(err);
            var stupidQuery = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'mysql' AND TABLE_NAME = 'history'"
            console.log(stupidQuery)
            con.query(stupidQuery,function(err,res){
              if(err)
              reject(err);
            
                resolve(res[0].AUTO_INCREMENT-1);
            })
           
        });

       
     
      
    });
}
 

module.exports.addOrder= async function(req,res)
{
  return await new Promise(async (resolve,reject) =>{
    var promises= [];
    for (var i = 0; i < localStorage.length; i++) {
      
    
      var key = localStorage.key(i);
      console.log(key);
      promises.push(
      this.asyncTransfer(req,key));
      
    
  
}
Promise.all(promises)
.then((result) => {
  resolve(result);
})
.catch((e) => {
    // Handle errors here
    reject(e);
  });
});
 

 
}
module.exports.buySuccess= async function(req,res)
{
  return await new Promise(async (resolve,reject) =>{
    var orderID = await this.TransferHistory(req,res);
    var promises= [];
    var module = this;
    con.query('SELECT * FROM cart WHERE userID = '+req.user.id, function(err,result){
    if(err)
      reject(err);
     
    for (var i in result) {
      promises.push(index.updateBuys(result[i].id,result[i].number));
      promises.push(module.asyncTransferBuy(orderID,result[i]));
}
  });
Promise.all(promises)
.then((results) => {
  console.log('final');
  con.query('DELETE FROM cart WHERE userID = '+ req.user.id,function(err,res){
      if(err)
        reject(err);
      resolve(res);
  })
  
})
.catch((e) => {
    // Handle errors here
    reject(e);
    })
 
})

 
}
module.exports.sum= async function(req,res)
{
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM cart WHERE userID = '+req.user.id, (err, results) => {
    if (err) {
      reject(err)
    } else {
      
      var sum = 0;
     for(i in results)
     sum=results[i].price*results[i].number+sum;
     
      resolve(sum);
    }
  })});
}
module.exports.sumDetail= async function(req,res)
{
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM orderdetail WHERE orderID ='+req.params.id, (err, results) => {
    if (err) {
      reject(err)
    } else {
     
      var sum = 0;
     for(i in results)
     sum=results[i].price*results[i].number+sum;
     
      resolve(sum);
    }
  })});
}
module.exports.transferOrder= async function(req,res)
{
  
  return await new Promise(function(resolve, reject){ con.query('SELECT * FROM cart WHERE userID = '+req.user.id, (err, results) => {
    if (err) {
      reject(err)
    } else {
      
      
      resolve(results);
    }
  })});
}
module.exports.updateCart =async function(req,res)
{
 console.log('a is '+req.query.value);
 console.log('b is '+req.query.id);
  return await new Promise(function(resolve, reject){ con.query('UPDATE `cart` SET number = ? WHERE id = ? and userID = ?',
  [req.query.value,req.query.id,req.user.id], (err, results) => {
    if (err) {
      reject(err)
    } else {
     
      con.query('SELECT * FROM cart WHERE userID = '+req.user.id,async (err, results) => {
        if (err) {
          reject(err)
        } else {
         // console.log(results);
          var sum = 0;
         for(i in results)
         sum=results[i].price*results[i].number+sum;
       
          resolve(sum);
        }
      })
      
    }
  })});
     
}
module.exports.removeCartItem=async function(req,res)
{
  
  return await new Promise(async (resolve,reject) =>{
    //console.log('res is'+res.user.id);
   
      con.query( 'DELETE FROM cart WHERE id = '+req.params.id+' and userID = '+req.user.id,function(err,results)
        {
          if(err)
            reject(err);
            resolve(results);
        });
      })
      
   
}
/*module.exports.addOrder= async function(req,res)
{
  return await new Promise(async (reject,resolve) =>{
    
    for (var i = 0; i < localStorage.length;i++) {
      
      {
      var key = localStorage.key(i);
      await this.asyncTransfer(key);
    }
    con.query('SELECT * FROM product WHERE userID = '+req.user.id,function(err,res)
    {
      if(err)
        reject(err);
      resolve(res); 
    })
  
  }
})
  
}*/