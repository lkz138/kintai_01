$(function(){/* 祝日チェック */
  var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
  if (!targetMonth) {
    targetMonth = {
      year: getTimer()['year'],
      month: getTimer()['month'],
    }
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
  }

  // 祝日チェック
  $('#kintai_timetable tbody tr td:first-child input').map(function(index_dom, dom){
    // 祝日一覧取得する
    $.ajax({
      type: 'GET',
      url: 'https://holidays-jp.github.io/api/v1/date.json',
      async: true,
      cache: true,
      contentType: false,
      dataType: 'text',
    }).done(function(responce){
      $.map(JSON.parse(responce.replace(/-/g, '')), function(arr, index_arr){
        // 取得したので、日付書式を合わせる
        if( index_arr.slice(0,4) == targetMonth['year'] && index_arr.slice(4,6) == targetMonth['month'] ) {
          // 対象付きのみ処理
          if( targetMonth['year'] + targetMonth['month'] + ('00'+(index_dom+1)).slice(-2) == index_arr ){
            $('#kintai_timetable tbody tr:nth-child('+(index_dom+1)+')').addClass('day_holiday');
            $('#kintai_timetable tbody tr:nth-child('+(index_dom+1)+') td:last-child input:first-child').attr({
              title: arr,
              placeholder: arr,
            });
          }
        }
      });
    });
  });
});
