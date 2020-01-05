var con = require('./db')
const mysql = require('mysql');

module.exports.getAllUser = async()=>
{ 
 
   return await new Promise((resolve, reject) => con.query('SELECT * FROM users', (err, results) => {
    if (err) {
      throw err
    } else {
      resolve(results);
    }
  }));
   
}

module.exports.getNumberOfUser = async()=>
{ 
 
   return await new Promise((resolve, reject) => con.query('SELECT COUNT(*) as SoLuong FROM users', (err, results) => {
    if (err) {
      throw err
    } else {
      resolve(results);
    }
  }));
   
}

module.exports.deleteUser = async(id)=>
{ 
 
   return await new Promise((resolve, reject) => con.query('DELETE From users where id = '+id, (err, results) => {
    if (err) {
      console.log('id: ',id)
    } else {
      resolve(results);
    }
  }));
   
}


module.exports.addUser = async(username,password,isAdmin)=>
{ 
   return await new Promise((resolve, reject) => con.query('Insert into users(username,password,isAdmin) value ("'+username+'","'+password+'","'+isAdmin+'")', (err, results) => {
    if (err) {
      throw err;
    } else {
      resolve(results);
    }
  }));
   
}

module.exports.getUser = async(id)=>
{ 
   return await new Promise((resolve, reject) => con.query('Select * From users where id = "'+id+'"', (err, results) => {
    if (err) {
      throw err;
    } else {
      resolve(results);
    }
  }));
   
}

module.exports.updateUser = async(id,username,password,isAdmin)=>
{ 
   return await new Promise((resolve, reject) => con.query('UPDATE users SET username = "'+username+'",password = "'+password+'",isAdmin ="'+isAdmin+'" WHERE id = '+id, (err, results) => {
    if (err) {
      throw err;
    } else {
      resolve(results);
    }
  }));
   
}

module.exports.lockUser = async(id)=>
{ 
   return await new Promise((resolve, reject) => con.query('UPDATE users SET isLocked = true  WHERE id = '+id, (err, results) => {
    if (err) {
      console.log('id: ',id)
    } else {
      resolve(results);
    }
  }));
   
}

module.exports.unlockUser = async(id)=>
{ 
   return await new Promise((resolve, reject) => con.query('UPDATE users SET isLocked = false  WHERE id = '+id, (err, results) => {
    if (err) {
      console.log('id: ',id)
    } else {
      resolve(results);
    }
  }));
   
}
