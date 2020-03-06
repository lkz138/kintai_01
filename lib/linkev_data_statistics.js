$(function(){
  $('a[href="#data_statistics"]').click(function(){
    $('#menu_bar').slideUp();
    $('.modalBoxWindow').slideUp();
    $('#kintai_timetable_statistics').fadeIn();

    var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
    if (!targetMonth) {
      targetMonth = {
        year: getTimer()['year'],
        month: getTimer()['month'],
      }
      localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
    }
  });
});
