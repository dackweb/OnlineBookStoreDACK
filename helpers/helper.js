var Handlebars = require('handlebars');
Handlebars.registerHelper('filter', function(res) {
 
    return 'search?author='+res.author+ '&type='+res.type+'&price='+res.price+'&value='+res.value;
   });
   Handlebars.registerHelper('cmt', function(res) {
   
    return 'cmt?id='+res;
   });
   Handlebars.registerHelper('searchname', function(res) {
   
   
       return 'searchName?name='+res.name;
  
   
   
   });