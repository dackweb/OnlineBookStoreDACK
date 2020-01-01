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
  app.post('/register',passport.authenticate('local-register', { successRedirect: '/logout',
                                     failureRedirect: '/register',
                                     failureFlash: true }
                                     )

                                     
  );
 
  app.get('/logout', function(req, res,) {
    req.logout();
    res.redirect('login');
  });
  app.get('/change_password', function(req, res,) {
    if(req.isAuthenticated())
    res.render('change-pass', { title: 'Express',message: req.flash('changePassMessage')});
    else
    res.redirect('login');
  });
  app.post('/change_password',
    passport.authenticate('local-changepassword', { successRedirect: '/',
                                     failureRedirect: '/change_password',
                                     failureFlash: true })
  );
  function isLogined(req,res,next)
  {
      if(req.isAuthenticated())
      return next;
      res.redirect('/');
  }
}