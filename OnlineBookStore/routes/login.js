module.exports=function(app,passport)
{
    app.get('/login', function(req, res,) {
        res.render('login', { title: 'Express',message: req.flash('loginMessage')});
      });
    app.post('/login',
    passport.authenticate('local-login', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })
  );
  app.get('/register', function(req, res,) {
    res.render('register', { title: 'Express',message: req.flash('signupMessage') });
  });
  app.post('/register',
    passport.authenticate('local-register', { successRedirect: '/',
                                     failureRedirect: '/register',
                                     failureFlash: true })
  );
  function isLogined(req,res,next)
  {
      if(req.isAuthenticated())
      return next;
      res.redirect('/');
  }
}