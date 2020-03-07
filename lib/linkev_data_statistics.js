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

    var tbody_date = 0;
    var tbody_date_str = '';
    var endofmonth = new Date( Number( targetMonth['year'] ), Number( targetMonth['month'] ), 0 ).getDate(); // 月末日
    var total_date_work = [ 0, 0, 0 ]; // 出勤日数 全, 上, 下
    var total_time_work = [ 0, 0, 0 ]; // 勤務時間 全, 上, 下
    var total_time_over = [ 0, 0, 0 ]; // 残業時間 全, 上, 下
    var total_time_mdnt = [ 0, 0, 0 ]; // 深夜時間 全, 上, 下
    var time_work = 0;
    var time_over = 0;
    var time_mdnt = 0;

    for (tbody_date = 1; tbody_date <= endofmonth; tbody_date++) {
      tbody_date_str = ('0' + tbody_date).slice(-2);
      console.log(tbody_date_str);

      time_work = ( $('#timetable output[name="total_'       + tbody_date_str + '"]').text() + ':00');
      time_work = time_work.split(':');
      time_work = [ time_work[0], time_work[1] ];
      time_work = ( ( Number( time_work[0] ) * 60 ) + ( Number( time_work[1] ) * 01 ) );

      time_over = ( $('#timetable output[name="outOfTime_'   + tbody_date_str + '"]').text() + ':00');
      time_over = time_over.split(':');
      time_over = [ time_over[0], time_over[1] ];
      time_over = ( ( Number( time_over[0] ) * 60 ) + ( Number( time_over[1] ) * 01 ) );

      time_mdnt = ( $('#timetable output[name="nightOfTime_' + tbody_date_str + '"]').text() + ':00');
      time_mdnt = time_mdnt.split(':');
      time_mdnt = [ time_mdnt[0], time_mdnt[1] ];
      time_mdnt = ( ( Number( time_mdnt[0] ) * 60 ) + ( Number( time_mdnt[1] ) * 01 ) );

      if ( time_work > 0) { total_date_work[0] += 1; }
      total_time_work[0] += time_work;
      total_time_over[0] += time_over;
      total_time_mdnt[0] += time_mdnt;

      if (false) {
      } else if (tbody_date >= 1 && tbody_date <= 15) {
        if ( time_work > 0) { total_date_work[1] += 1; }
        total_time_work[1] += time_work;
        total_time_over[1] += time_over;
        total_time_mdnt[1] += time_mdnt;

      } else if (tbody_date >= 16 && tbody_date <= endofmonth) {
        if ( time_work > 0) { total_date_work[2] += 1; }
        total_time_work[2] += time_work;
        total_time_over[2] += time_over;
        total_time_mdnt[2] += time_mdnt;

      }
    }

    console.log( [['勤務時間', total_time_work], ['残業時間', total_time_over], ['深夜時間', total_time_mdnt]] );

    for (var i = 0; i < total_time_work.length; i++) {
      total_time_work[i] = parseInt( total_time_work[i] / 60 ) + ':' + ( ( '00' + total_time_work[i] % 60 ).slice(-2) );
    }
    for (var i = 0; i < total_time_over.length; i++) {
      total_time_over[i] = parseInt( total_time_over[i] / 60 ) + ':' + ( ( '00' + total_time_over[i] % 60 ).slice(-2) );
    }
    for (var i = 0; i < total_time_mdnt.length; i++) {
      total_time_mdnt[i] = parseInt( total_time_mdnt[i] / 60 ) + ':' + ( ( '00' + total_time_mdnt[i] % 60 ).slice(-2) );
    }


    console.log( [['勤務時間', total_time_work], ['残業時間', total_time_over], ['深夜時間', total_time_mdnt]] );

    // 統計の子供と孫生成
    $('#kintai_timetable_statistics .modalBoxWindow_contents').empty();
    $('#kintai_timetable_statistics .modalBoxWindow_contents').append('<table />');

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child').append('<thead />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead').append('<tr />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child th:last-child').attr({
      colspan: 5,
    });
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child th:last-child').text( targetMonth['year'] + '/' + targetMonth['month'] );

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead').append('<tr />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child th:last-child').text( '01-' + endofmonth);
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child th:last-child').text( '01-' + 15);
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child thead tr:last-child th:last-child').text( '16-' + endofmonth);

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child').append('<tbody />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody').append('<tr />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child th:last-child').text('総出勤日数');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_date_work[0] ); // フィールド All - 総出勤日数

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_date_work[1] ); // フィールド 上半期 - 総出勤日数

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_date_work[2] ); // フィールド 下半期 - 総出勤日数


    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody').append('<tr />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child th:last-child').text('総勤務時間');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_work[0] ); // フィールド All - 総勤務時間

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_work[1] ); // フィールド 上半期 - 総勤務時間

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_work[2] ); // フィールド 下半期 - 総勤務時間


    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody').append('<tr />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child th:last-child').text('総残業時間');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_over[0] ); // フィールド All - 総残業時間

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_over[1] ); // フィールド 上半期 - 総残業時間

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_over[2] ); // フィールド 下半期 - 総残業時間


    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody').append('<tr />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<th />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child th:last-child').text('総深夜時間');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_mdnt[0] ); // フィールド All - 総深夜時間

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_mdnt[1] ); // フィールド 上半期 - 総深夜時間

    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child').append('<td />');
    $('#kintai_timetable_statistics .modalBoxWindow_contents table:last-child tbody tr:last-child td:last-child').text( total_time_mdnt[2] ); // フィールド 下半期 - 総深夜時間

  });
});
