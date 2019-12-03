var localStrategy = require("passport-local").Strategy;
var con = require('./db')
const mysql = require('mysql');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport)
{
    passport.serializeUser(function(user,done)
    {
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        con.query("SELECT * FROM users WHERE ID = ?",[id],function(err,rows)
        {done(err,rows[0]);
        });
    });


    passport.use('local-register',new localStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
    function(req,username,password,done){
        con.query("SELECT * FROM users WHERE username = ?",[username],function(err,rows)
        {
            if(err)
                 return done(err);
            if(rows.length){
                return done(null,false,req.flash('signupMessage','Tên đăng nhập đã tồn tại'));
            }
           
            else{
                if(password.length<6){
                return done(null,false,req.flash('signupMessage','Mật khẩu ít hơn 6 ký tự'));
                }
                //var salt = bcrypt.genSaltSync(8);
                var hash = bcrypt.hashSync(password, null);
                var newUser =
                 {
                     username:username,
                     password:hash
                    
                 };
                 console.log(newUser.password);
                    var InsertQuery = "INSERT INTO users(username,password) values (?,?)"; 
                    con.query(InsertQuery,[newUser.username,newUser.password],
                     function(err,rows){
                         newUser.id = rows.insertId;
                        
                         return done(null,newUser);
                     });
               
               /* bcrypt.hash(password, salt, null,function (err,   hash) {
                    if(err)
                 return done(err);
                 var newUser =
                 {
                     username:username,
                     password:hash
                    
                 };
                    var InsertQuery = "INSERT INTO users(username,password) values (?,?)"; 
                    con.query(InsertQuery,[newUser.username,newUser.password],
                     function(err,rows){
                         newUser.id = rows.insertId;
                        
                         return done(null,newUser);
                     });
          
          
        });
        */
        }
        })
    })
    );
    passport.use('local-login',new localStrategy({
        usernameField:'username',
        passwordField:'password',
        passReqToCallback:true
    },
     function(req,username,password,done){
        con.query("SELECT * FROM users WHERE username = ?",[username], function(err,rows)
        {
            if(err)
                 return done(err);
                 if(!rows.length){
                    return done(null,false,req.flash('loginMessage','failed to login'));
                 }
                 var result =   bcrypt.compareSync(password, rows[0].password);
                if(result ==false)
                return  done(null,false,req.flash('loginMessage','wrong password'))
                 return done(null,rows[0]);
                /* var h2 =   bcrypt.compareSync(password, rows[0].password);
                if(h2 ==false)
                return  done(null,false,req.flash('loginMessage','wrong password'));*/
                 /* bcrypt.compare(password, rows[0].password,function (err, result) {
                    if(err)
                    return done(err);
                    console.log('result is');
                    console.log(result);
                    if (result == false) {
                        
                    return  done(null,false,req.flash('loginMessage','wrong password'));
                    
                }
               
                return done(null,rows[0]);
               
            });*/
            
           
         
        });
    }
    
   /*async function(req,username,password,done){
    return await new Promise((resolve, reject) =>con.query("SELECT * FROM users WHERE username = ?",[username], function(err,rows)
    {
        if(err)
             return done(err);
        if(!rows.length){
                resolve( done(null,false,req.flash('loginMessage','failed to login')));
            }
             
              bcrypt.compare(password, rows[0].password,function (err, result) {
                if(err)
                reject(done(err)) ;
                
                if (result == false) {
                    
                    resolve(done(null,false,req.flash('loginMessage','wrong password')));
                
            }
           
            resolve(done(null,rows[0])) ;
           
        });
        
       
      
    })

   )}*/
    ))
};