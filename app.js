var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
require('./models/passport')(passport);
//const mysql = require('mysql');





require('custom-env').env()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layouts/'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'secret'
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
var index = require('./routes/index');
app.use('/',index);
/*const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:process.env.DB_DATABASE
});
con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  con.query("SELECT * FROM product", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/

/*app.use('/shop', function (req, res, next) {

  con.query('SELECT * FROM product',  (err, result)=> {
    if (err) throw err;
    
    res.render('shop', { results:result });
   // console.log(result);
   
  });
  });*/
/*app.use('/product/:id', function(req, res, next) {

  var sql = 'SELECT * FROM product WHERE id = '+mysql.escape(req.params.id);
    con.query(sql,  (err, result)=> {
      if (err) throw err;
      res.render('product', { title:result[0].name,name:result[0].name,img:result[0].img,author:result[0].author,type:result[0].type,price:result[0].price,description:result[0].description });
    
     
   // console.log(result);
   
  });
  });

app.use('/single-product/:id', function (req, res, next) {

var sql = 'SELECT * FROM product WHERE id = '+mysql.escape(req.params.id);
  con.query(sql,  (err, result)=> {
    if (err) throw err;
    res.render('single-product', { title:result[0].name,name:result[0].name,img:result[0].img,author:result[0].author,type:result[0].type,price:result[0].price,description:result[0].description });
  
   
 // console.log(result);
 
});
});
app.use('/author,);
  app.use('/type/:id', function (req, res, next) {

    var sql = 'SELECT * FROM product WHERE type = '+mysql.escape(req.params.id);
      con.query(sql,  (err, result)=> {
        if (err) throw err;
        res.render('shop', { results:result});
      
    });
    });
 /* con.query('SELECT * FROM product',  (err, result)=> {
    if (err) throw err;
    console.log('what I receive is:');
    console.log(result);
    res.render('index', { results:result });
  
   
 // console.log(result);
 
});
});*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
