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
    
    
    $.get('/add/cart/'+id,function() {
        
      })
       
       .done(function(res) {

           console.log('hi minna');
            $("#notification").html("+1");
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
 const id = $(cmtid).attr('value');

 //console.log( $(#.val());
 
 const user = $(userid).attr('value');

const cmt = $('input[name="thêm bình luận"]').val();

 $.ajax({
    url: '/add/user/cmt' ,
    method: 'POST',
    data: { cmtid: id,userid:user,cmt:cmt }
   
   
    
    }).done(function(res) {
        console.log('nono');
        $('#body').load('/single-product/'+id);
        
      
       
})
.fail(function() {
    console.log('fail');
})
.always(function(){
  
    console.log('xxx');
})
})

$("input[name^='cartItem_']").TouchSpin(
{
    min:1,max:100
});
$("input[name^='cartItem_']").on('touchspin.on.stopspin',(function()
{
   
    const val = $(this).val();
    const id = $(this).attr('id');
    console.log('val is '+id);
    console.log('id is '+val);
    
    $.ajax({
        url: '/add/cart2' ,
        method: 'GET',
        data: { value:val,id : id },
        
       
        
        }).done(function(res) {

            //console.log('nono')+res ;
          console.log('res is '+res);
         
            $('#totalMoney').html(" <p>Giá tổng cộng:"+res+"</p>");
            
          
           
    })
    .fail(function() {
        console.log('fail');
    })
    .always(function(){
      
        console.log('xxx');
    })
}));
$("button[name^=removeButton_]").on('click',(function()
{
   
    
    const id = $(this).attr('id');
    console.log('val is '+id);
    
    
    $.ajax({
        url: '/crud/remove/cart/'+id ,
        method: 'GET',
        data: {id : id },
        
       
        
        }).done(function(res) {

            //console.log('nono')+res ;
          console.log('res is '+res);
         
          $('#body').load('/cart');
            
          
           
    })
    .fail(function() {
        console.log('fail');
    })
    .always(function(){
      
        console.log('xxx');
    })
}));
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
    
    
 
    
