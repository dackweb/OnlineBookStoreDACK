var localStrategy = require("passport-local").Strategy;
var con = require('./db')
const mysql = require('mysql');
var flash = require('connect-flash');
var bcrypt = require('bcrypt-nodejs');
var nodemailer = require('nodemailer');


/*module.exports = function(passport)
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
                if(password!=req.body.password2)
                {
                    return done(null,false,req.flash('signupMessage','Mật khẩu nhập lại không khớp'));
                }
                //var salt = bcrypt.genSaltSync(8);
                var hash = bcrypt.hashSync(password, null);
                var newUser =
                 {
                     username:username,
                     password:hash,
                     flag:false
                    
                 };
               
                    var InsertQuery = "INSERT INTO users(username,password) values (?,?)"; 
                    con.query(InsertQuery,[newUser.username,newUser.password],
                     function(err,rows){
                        if(err)
                        return done(err);
                         newUser.id = rows.insertId;
                        
                         return done(null,newUser);
                     });
               
            
        }
        })
    })
    );*/
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
                if(password!=req.body.password2)
                {
                    return done(null,false,req.flash('signupMessage','Mật khẩu nhập lại không khớp'));
                }
                //var salt = bcrypt.genSaltSync(8);
                var hash = bcrypt.hashSync(password, null);
                var newUser =
                 {
                     username:username,
                     password:hash,
                     email:req.body.email,
                     flag:false
                    
                 };
                 emailToken = req.body.email;
                 const url = `http://localhost:3000/confirmation/${emailToken}`;
                 var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'kaitouthuan@gmail.com',
                      pass: 'kyonaruto'
                    }
                  });
               transporter.sendMail({from:'kaitouthuan@gmail.com',to:req.body.email,subject:'confirm email',html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
               function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              }})
                    var InsertQuery = "INSERT INTO users(username,password,email,isAdmin) values (?,?,?,?)"; 
                    con.query(InsertQuery,[newUser.username,newUser.password,newUser.email,0],
                     function(err,rows){
                        if(err)
                        return done(err);
                         newUser.id = rows.insertId;
                         return done(null,newUser);
                         
                     });
               
            
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
                    return done(null,false,req.flash('loginMessage','Tài khoản hoặc mật khẩu không hợp lệ'));
                 }
                 var result =   bcrypt.compareSync(password, rows[0].password);
                if(result ==false)
                return  done(null,false,req.flash('loginMessage','Tài khoản hoặc mật khẩu không hợp lệ'))
                if(!rows[0].confirmed)
                return done(null,false,req.flash('loginMessage','Bạn chưa kích hoạt tài khoản'));
                if(rows[0].isLocked)
                return done(null,false,req.flash('loginMessage','Tài khoản của bạn đã bị khóa'));
                 return done(null,rows[0]);
              
           
         
        });
    }
    
 
    ))
    passport.use('local-changepassword',new localStrategy({
        usernameField:'password',
        passwordField:'password2',
        passReqToCallback:true
    },
     function(req,password,password2,done){
        con.query("SELECT * FROM users WHERE id = ?",[req.user.id], function(err,rows)
        {
            if(err)
                 return done(err);
                 ;
                 console.log(req.isAuthenticated());
                
                 
         if(password2.length<6||password.length<6){
                    return done(null,false,req.flash('changePassMessage','Mật khẩu ít hơn 6 ký tự'));
                    }
                    
                var result =   bcrypt.compareSync(password,rows[0].password);
                if(result ==false)
                return  done(null,false,req.flash('changePassMessage','Sai mật khẩu'));
                 
                if(password2!=req.body.password3)
                return  done(null,false,req.flash('changePassMessage','Mật khẩu nhập lại không khớp'));
                var hash = bcrypt.hashSync(password2, null);
                var InsertQuery = "UPDATE users SET password = ? WHERE id= ?"; 
                con.query(InsertQuery,[hash,rows[0].id],
                 function(err,res){
                    if(err)
                    return done(err);
                     
                    
                     return done(null,rows[0]);
                 });
                 
              
           
         
        });
    }
    
    
    ))
    
};
