$(function(){
  $('#menu_opener img').click(function(){
    $('#menu_bar').toggle();
  });

  $('#menu_bar li:not(a)').click(function(){
    if ( $('#menu_bar').is(':visible') ) {
      console.log($(this).children().eq(0));
    }
  });

});
