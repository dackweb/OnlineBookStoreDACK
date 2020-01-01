/*$('.todo-list-group').on('click', '#cart', function(event) {
    event.preventDefault();
    const id = $(this).attr('id');
    $.ajax({
        url: '/addCart/' + id,
        method: 'GET',
        data: { id: id }
        }).done(function(res) {
            if (res.success) {
            console.log('id from ajax call is', res);
           
        } else {
            console.log('error...ajax');
            }
})
});*/


/*var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
*/
$(document).ready(function() {
    // $('.navbar-toggler').click(function() {
    //     $('.navbar-collapse').slideToggle();
    //    });
    
    
     
   // event.preventDefault();
   $( "#cart" ).click(function()
   {
      
    const id = $(this).attr('value');
    console.log(id);
    
    
    $.get('/addCart/'+id,function() {
        alert( 'success' );
      })
       
       .done(function(res) {
            if (res.success) {
            console.log('id from ajax call is', res);
           
        } else {
            console.log('error...ajax');
            }
})
    
})
$( "#addCMT" ).submit(function(e)
{
   e.preventDefault();
// const id = #userid.attr('cmtid');
 console.log('asdf');
 //console.log( $(#.val());
 console.log(id);
 const user = $(this).attr('userid');
 console.log(user);
 /*$.get('/addCart/'+id,function() {
     alert( 'success' );
   })
    
    .done(function(res) {
         if (res.success) {
         console.log('id from ajax call is', res);
        
     } else {
         console.log('error...ajax');
         }
         
})
 */
})
/*function addCmt(productId,userId)
{
if(userId ==undefined)
{
    window.location.href = '/login';
}
else{
    $.get('/addCart/'+productId,function() {
        alert( 'success' );
      })
       
       .done(function(res) {
            if (res.success) {
            console.log('id from ajax call is', res);
           
        } else {
            console.log('error...ajax');
            }

})
}
}*/
});
    
    
 
    
