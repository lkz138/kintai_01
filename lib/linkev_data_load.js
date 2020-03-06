$(function(){
  $('a[href="#data_load"]').click(function(){
    $('#menu_bar').slideUp();

    var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
    if (!targetMonth) {
      targetMonth = {
        year: getTimer()['year'],
        month: getTimer()['month'],
      }
      localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
    }

    var saveData = localStorage.getItem( ((btoa(location.href)).slice(0, 16) + '.saveData' + targetMonth['year'] + targetMonth['month']) );
    saveData = JSON.parse(saveData);
    if (!saveData) {
      console.error('Unable to load the save data.');
    } else {
      /* シフト時間 */
      // 始業時間
      $('input[name=workshift_shigyo_h]').val( ( '00' + ( (saveData['timetable_data'][0][0]).split(':')[0] ) ).slice(-2) );
      $('input[name=workshift_shigyo_m]').val( ( '00' + ( (saveData['timetable_data'][0][0]).split(':')[1] ) ).slice(-2) );
      // 終業時間
      $('input[name=workshift_syugyo_h]').val( ( '00' + ( (saveData['timetable_data'][0][1]).split(':')[0] ) ).slice(-2) );
      $('input[name=workshift_syugyo_m]').val( ( '00' + ( (saveData['timetable_data'][0][1]).split(':')[1] ) ).slice(-2) );
      // 休憩時間-1
      $('input[name=workshift_kyukei_1_h]').val( ( '00' + ( (saveData['timetable_data'][0][2]).split(':')[0] ) ).slice(-2) );
      $('input[name=workshift_kyukei_1_m]').val( ( '00' + ( (saveData['timetable_data'][0][2]).split(':')[1] ) ).slice(-2) );
      // 休憩時間-2
      $('input[name=workshift_kyukei_2_h]').val( ( '00' + ( (saveData['timetable_data'][0][3]).split(':')[0] ) ).slice(-2) );
      $('input[name=workshift_kyukei_2_m]').val( ( '00' + ( (saveData['timetable_data'][0][3]).split(':')[1] ) ).slice(-2) );
      // 勤務形態
      $('select[name=workshift_worktype]').val( (saveData['timetable_data'][0][4]) );

      var sectionId = '01';
      for (
        var tbody_date = 1;
        tbody_date <= new Date(Number(targetMonth['year']), Number(targetMonth['month']), 0).getDate();
        tbody_date++
      ) {
        sectionId = ('00'+tbody_date).slice(-2);

        //console.log( saveData['timetable_data'][tbody_date][1] ); /* 勤怠データ */
        //console.log( saveData['timetable_data'][tbody_date][2] ); /* 当日のシフト */
        //console.log( saveData['timetable_data'][tbody_date][3] ); /* 備考 */

        /* 勤怠データ(時間) もしくは 備考 が入力されていない場合は Skip */
        var importskip_check = 0;
        for (var i = 0; i < saveData['timetable_data'][tbody_date][1].length; i++) {
          /* 勤怠データ(時間) */
          importskip_check += saveData['timetable_data'][tbody_date][1][i];
        }
        if (importskip_check > 0) {
          var shigyo_time  = Number( saveData['timetable_data'][tbody_date][1][0] );
          var syugyo_time  = Number( saveData['timetable_data'][tbody_date][1][1] );
          var kyukei_1     = Number( saveData['timetable_data'][tbody_date][1][2] );
          var kyukei_2     = Number( saveData['timetable_data'][tbody_date][1][3] );
          var shift_time   = saveData['timetable_data'][tbody_date][2];
          var time_working = 0;
          var time_onshift = 0;
          var time_ovrtime = 0;
          var time_mdnight = 0;

          // 始業時間
          $('input[name=shigyo_h_' + sectionId + ']').val( ( '00' + ( parseInt(shigyo_time / 60) ) ).slice(-2) );
          $('input[name=shigyo_m_' + sectionId + ']').val( ( '00' + ( parseInt(shigyo_time % 60) ) ).slice(-2) );

          // 終業時間
          $('input[name=syugyo_h_' + sectionId + ']').val( ( '00' + ( parseInt(syugyo_time / 60) ) ).slice(-2) );
          $('input[name=syugyo_m_' + sectionId + ']').val( ( '00' + ( parseInt(syugyo_time % 60) ) ).slice(-2) );

          // 休憩時間-1
          $('input[name=kyukei_1_h_' + sectionId + ']').val( ( '00' + ( parseInt(kyukei_1 / 60) ) ).slice(-2) );
          $('input[name=kyukei_1_m_' + sectionId + ']').val( ( '00' + ( parseInt(kyukei_1 % 60) ) ).slice(-2) );

          // 休憩時間-2
          $('input[name=kyukei_2_h_' + sectionId + ']').val( ( '00' + ( parseInt(kyukei_2 / 60) ) ).slice(-2) );
          $('input[name=kyukei_2_m_' + sectionId + ']').val( ( '00' + ( parseInt(kyukei_2 % 60) ) ).slice(-2) );

          time_working = ( /* 勤務時間 */
            ( ( syugyo_time - shigyo_time ) - ( kyukei_1 + kyukei_2 ) )
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
            if (( shift_time ).length == 8) {
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
          if ( shigyo_time < ( 60*05 ) ) { time_mdnight += ( ( 60*05 ) - shigyo_time ); }
          if ( syugyo_time > ( 60*22 ) ) { time_mdnight += ( syugyo_time - ( 60*22 ) ); }

          $('output[name=nightOfTime_' + sectionId + ']').val(''
            + ( '00' + parseInt( time_mdnight / 60 ) ).slice(-2)
            + ':'
            + ( '00' + time_mdnight % 60 ).slice(-2)
          );

        }

        // シフト時間/シフト休/明け休/振り休 など
        if ( (saveData['timetable_data'][tbody_date][2]).length > 0 ) {
          // length is string length. no array length.
          $('input[name=workshift_' + sectionId + ']').val( (saveData['timetable_data'][tbody_date][2]) );
        } else {
          console.debug('Not in value \'シフト\' #' + sectionId);
        }

        // 備考
        if ( (saveData['timetable_data'][tbody_date][3]).length > 0 ) {
          // length is string length. no array length.
          $('input[name=bikou_' + sectionId + ']').val( (saveData['timetable_data'][tbody_date][3]) );
        } else {
          console.debug('Not in value \'備考\' #' + sectionId);
        }
      }

    }
  });
});
