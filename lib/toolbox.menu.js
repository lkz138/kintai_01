$(function(){
  $('#menu_opener img').click(function(){
    $('#menu_bar').toggle();
  });

  $('#menu_bar li').click(function(){
    if ( $('#menu_bar').is(':visible') ) {
      //$(this).children().eq(0).click();
      console.log($(this).children().eq(0));
    }
  });

});
