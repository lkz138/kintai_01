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
      $('#menu_bar').hide();

      console.debug( $(this).children('a').eq(0).attr('href') );
      console.log(( ( $(this).children('a').eq(0).attr('href') ).slice(0, 1) ) == '#');
      if ( ( ( $(this).children('a').eq(0).attr('href') ).slice(0, 1) ) == '#' ) {
        $('a[href="' + $(this).children('a').eq(0).attr('href') + '"]:not(li)').click();
      } else {
        window.location = $(this).children('a').eq(0).attr('href');
      }
    }
  });

});
