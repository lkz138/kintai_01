$(function(){
  $('#menu_opener img').click(function(){
    if ( $('#menu_bar').is(':visible') ) {
      $('#menu_bar').fadeOut(750);
    } else {
      $('#menu_bar').show(150);
    }
  });

  $('#menu_bar li:not(a)').click(function(){
    if ( $('#menu_bar').is(':visible') ) {
      console.log($(this).children().eq(0));
    }
  });

});
