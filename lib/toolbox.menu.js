$(function(){
  $('#menu_opener img').click(function(){
    $('#menu_bar').toggle();
  });

  $('#menu_bar li').click(function(){
    console.log($(this).children().eq(0));
    console.log($(this).children('a').eq(0));

    if ( $('#menu_bar').is(':visible') ) {
      alert( 'warning' );
      //$(this).children().eq(0).click();
    }
  });

});
