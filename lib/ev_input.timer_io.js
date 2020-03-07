$(function(){
  $('input.timer_io').change(function(){
    /* 全角数字を半角数字に変える */
    $(this).val( ($(this).val()).replace(/[０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }) );

    /* 数字以外を削除 */
    $(this).val( ($(this).val()).replace(/[^0-9]/g, '') );

    /* 数字 1桁 を 2桁 にする */
    $(this).val( ( '00' + $(this).val() ).slice(-2) );

  });
  $('input.timer_io:not(input[name^=workshift_])').change(function(){
    var sectionId = $(this).attr('name').slice(-2);
    $('input[name=shigyo_'+sectionId+']').val(
        Number( $('input[name=shigyo_h_' + sectionId + ']').val()   * 60 )
      + Number( $('input[name=shigyo_m_' + sectionId + ']').val()        )
    );
    if ($('input[name=shigyo_h_' + sectionId + ']').val() == '') {
      $('input[name=shigyo_m_' + sectionId + ']').val('');
    }

    $('input[name=syugyo_'+sectionId+']').val(
        Number( $('input[name=syugyo_h_' + sectionId + ']').val()   * 60 )
      + Number( $('input[name=syugyo_m_' + sectionId + ']').val()        )
    );
    if ($('input[name=syugyo_h_' + sectionId + ']').val() == '') {
      $('input[name=syugyo_m_' + sectionId + ']').val('');
    }

    $('input[name=kyukei_1_'+sectionId+']').val(
        Number( $('input[name=kyukei_1_h_' + sectionId + ']').val() * 60 )
      + Number( $('input[name=kyukei_1_m_' + sectionId + ']').val()      )
    );
    if ($('input[name=kyukei_1_h_' + sectionId + ']').val() == '') {
      $('input[name=kyukei_1_m_' + sectionId + ']').val('');
    }

    $('input[name=kyukei_2_'+sectionId+']').val(
        Number( $('input[name=kyukei_2_h_' + sectionId + ']').val() * 60 )
      + Number( $('input[name=kyukei_2_m_' + sectionId + ']').val()      )
    );
    if ($('input[name=kyukei_2_h_' + sectionId + ']').val() == '') {
      $('input[name=kyukei_2_m_' + sectionId + ']').val('');
    }

    // 数値チェック
    var shigyo_time  = Number( $('input[name=shigyo_'    + sectionId + ']').val() );
    var syugyo_time  = Number( $('input[name=syugyo_'    + sectionId + ']').val() );
    var kyukei_1     = Number( $('input[name=kyukei_1_'  + sectionId + ']').val() );
    var kyukei_2     = Number( $('input[name=kyukei_2_'  + sectionId + ']').val() );
    var shift_time   = ( $('input[name=workshift_' + sectionId + ']').val() );
    var time_working = 0;
    var time_onshift = 0;
    var time_ovrtime = 0;
    var time_mdnight = 0;

    // エラー解除
    $('#kintai_timetable tbody tr:nth-child('+sectionId+') input.timer_io').removeClass('err_validation');

    // 終業時間が 始業時間と同じもしくはそれ以下 の場合 -> エラー表示
    if ( Number(syugyo_time) <= Number(shigyo_time) ){
      $('#kintai_timetable tbody tr:nth-child('+sectionId+') input.timer_io').addClass('err_validation');
    }

    // 終業時間と始業時間が　文字なし の場合 -> エラー表示解除
    if ( ( syugyo_time == '' ) && ( shigyo_time == '' ) ) {
      $('#kintai_timetable tbody tr:nth-child('+sectionId+') input.timer_io').removeClass('err_validation');
      $('input[name=kyukei_1_h_' + sectionId + ']').val('');
      $('input[name=kyukei_1_m_' + sectionId + ']').val('');
      $('input[name=kyukei_2_h_' + sectionId + ']').val('');
      $('input[name=kyukei_2_m_' + sectionId + ']').val('');
    }

    console.log( sectionId
      + '   ' + ''
      + '   ' + shigyo_time
      + '   ' + syugyo_time
      + '   ' + kyukei_1
      + '   ' + kyukei_2
      + '   ' + shift_time
      + '   ' + '|'
      + '   ' + $('input[name=shigyo_'    + sectionId + ']').val()
      + '   ' + $('input[name=syugyo_'    + sectionId + ']').val()
      + '   ' + $('input[name=kyukei_1_'  + sectionId + ']').val()
      + '   ' + $('input[name=kyukei_2_'  + sectionId + ']').val()
      + '   ' + $('input[name=workshift_' + sectionId + ']').val()
    );

    time_working = ( /* 勤務時間 */
      ( syugyo_time - shigyo_time ) - ( kyukei_1 + kyukei_2 )
    );

    // 勤務時間
    $('output[name=total_' + sectionId + ']').val(''
      + ( '00' + parseInt( time_working / 60 ) ).slice(-2)
      + ':'
      + ( '00' + parseInt( time_working % 60 ) ).slice(-2)
    );

    // 残業時間
    $('output[name=outOfTime_' + sectionId + ']').val('00:00');
    if( Number.isInteger( Number( shift_time ) ) ){
      if (shift_time.length == 8) {
        time_onshift = [
          ( shift_time ).slice(0, 4),
          ( shift_time ).slice(4, 8),
        ];
        time_onshift = [
          ( time_onshift[0] ).slice(0, 2),
          ( time_onshift[0] ).slice(2, 4),
          ( time_onshift[1] ).slice(0, 2),
          ( time_onshift[1] ).slice(2, 4),
        ];
        time_onshift = [
          ( Number( time_onshift[0] ) * 60 ),
          ( Number( time_onshift[1] )      ),
          ( Number( time_onshift[2] ) * 60 ),
          ( Number( time_onshift[3] )      ),
        ];
        time_onshift = [
          ( Number( time_onshift[0] ) + Number( time_onshift[1] ) ),
          ( Number( time_onshift[2] ) + Number( time_onshift[3] ) ),
        ];
        time_onshift = time_onshift[1] - time_onshift[0];
        if( (time_onshift / 60) > 6 ){ time_onshift -= 60; }

        console.log( '実働: ' + time_working + ' // ' + time_working / 60 );
        console.log( 'シフト: '+time_onshift + ' // ' + time_onshift / 60 );

      }

      time_ovrtime = time_working - time_onshift;
      if (time_ovrtime > 0) {
        $('output[name=outOfTime_' + sectionId + ']').val(''
          + ( '00' + parseInt( time_ovrtime / 60 ) ).slice(-2)
          + ':'
          + ( '00' + time_ovrtime % 60 ).slice(-2)
        );
      }
    }

    // 深夜時間
    console.log( shigyo_time + '..<..' + ( 60*05 ) + ': ' + ( shigyo_time < ( 60*05 ) ) + ' => ' + ( ( ( 60*05 ) - shigyo_time ) ) );
    console.log( syugyo_time + '..>..' + ( 60*22 ) + ': ' + ( syugyo_time > ( 60*22 ) ) + ' => ' + ( ( syugyo_time - ( 60*22 ) ) ) );

    if ( shigyo_time < ( 60*05 ) ) {
      if ( syugyo_time < ( 60*05 ) ) { time_mdnight += ( syugyo_time - shigyo_time ); }
      else { time_mdnight += ( ( 60*05 ) - shigyo_time ); }
    }

    if ( syugyo_time > ( 60*22 ) ) {
      if ( shigyo_time > ( 60*22 ) ) { time_mdnight += ( syugyo_time - shigyo_time ); }
      else { time_mdnight += ( syugyo_time - ( 60*22 ) ); }
    }

    $('output[name=nightOfTime_' + sectionId + ']').val(''
      + ( '00' + parseInt( time_mdnight / 60 ) ).slice(-2)
      + ':'
      + ( '00' + time_mdnight % 60 ).slice(-2)
    );

  });

  $('input.timer_io').focus(function(){
    $(this).select();
  });

  $('input.timer_io').blur(function(){
    $(this).change();
  });
});
