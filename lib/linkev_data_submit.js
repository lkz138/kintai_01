$(function(){
  $('a[href="#data_submit"]').click(function(){
    $('#menu_bar').slideUp();

    var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
    if (!targetMonth) {
      targetMonth = {
        year: getTimer()['year'],
        month: getTimer()['month'],
      }
      localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
    }

    var postData = '';
    postData = [
      '日付', '始業時刻', '終業時刻', '休憩時間', '休憩時間(深夜)', '残業時間', '深夜時間', '合計', '備考', "\r\n"
    ].join(',');
    var worktime = [];
    for (
      var tbody_date = 1;
      tbody_date <= new Date(Number(targetMonth['year']), Number(targetMonth['month']), 0).getDate();
      tbody_date++
    ) {
      sectionId = ('00'+tbody_date).slice(-2);
      worktime = ([
        /* 0 */ targetMonth['year'] + '/' + targetMonth['month'] + '/' + sectionId,
        /* 1 */ ( Number( $('input[name=shigyo_h_' + sectionId + ']').val() ) * 60 ) + Number( $('input[name=shigyo_m_' + sectionId + ']').val() ),
        /* 2 */ ( Number( $('input[name=syugyo_h_' + sectionId + ']').val() ) * 60 ) + Number( $('input[name=syugyo_m_' + sectionId + ']').val() ),
        /* 3 */ Number( $('input[name=kyukei_1_' + sectionId + ']').val() ),
        /* 4 */ Number( $('input[name=kyukei_2_' + sectionId + ']').val() ),
        /* 5 */ 0,
        /* 6 */ 0,
        /* 7 */ ( Number( $('output[name=total_' + sectionId + ']').text().split(':')[0] ) * 60 ) + Number( $('output[name=total_' + sectionId + ']').text().split(':')[1] ),
        /* 8 */ $('input[name=workshift_' + sectionId + ']').val() + ' ' + $('input[name=bikou_' + sectionId + ']').val(),
        /* 9 */ "\r\n",
      ]);

      worktime[5] /* 残業時間 */ = ( worktime[7] - ( /* シフトの時間 */
            Number( ( ( Number($('input[name=workshift_syugyo_h]').val())   * 60 ) + Number($('input[name=workshift_syugyo_m]').val())   ) ) - Number( ( ( Number($('input[name=workshift_shigyo_h]').val())   * 60 ) + Number($('input[name=workshift_shigyo_m]').val())   ) )
        - ( Number( ( ( Number($('input[name=workshift_kyukei_1_h]').val()) * 60 ) + Number($('input[name=workshift_kyukei_1_m]').val()) ) ) + Number( ( ( Number($('input[name=workshift_kyukei_2_h]').val()) * 60 ) + Number($('input[name=workshift_kyukei_2_m]').val()) ) ) )
      ) );
      if (worktime[5] < 0) { worktime[5] = 0; }

      for (var i = 1; i <= 7; i++) {
        // 計算しなくていいとこは飛ばす
        if (false) {}
        else if ( i == 6) { continue; }

        // 時間データを hh:mm に変換
        worktime[i] = ( ( '00' + parseInt( ( Number(worktime[i]) ) / 60 ) ).slice(-2) ) + ':' + ( ( '00' + parseInt( ( Number(worktime[i]) ) % 60 ) ).slice(-2) )
      }

      console.log(worktime);
      postData += worktime.join(',');
    }

    /* Control the Blob on the Jquery https://www.sejuku.net/blog/67735 */
    var blobdata = new Blob([postData], {type: 'text/plain'});

    $(this).attr({
      download: '【勤怠情報】' + targetMonth['year'] + '/' + targetMonth['month'] + '.txt',
      href: window.URL.createObjectURL(blobdata),
    });
  });
});
