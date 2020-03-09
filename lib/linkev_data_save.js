$(function(){
  $('a[href="#data_save"]').click(function(){
    $('#menu_bar').slideUp();

    var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
    if (!targetMonth) {
      targetMonth = {
        year: getTimer()['year'],
        month: getTimer()['month'],
      }
      localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
    }
    // save the data is below
    // - timetable data
    // - google oauth credential
    var saveData = [];
    var enviromentData = [];
    var sectionId = '01';

    /* <userData> */
      saveData.push(
        [
          ( $('input[name=workshift_shigyo_h]').val() + ':' + $('input[name=workshift_shigyo_m]').val() ),
          ( $('input[name=workshift_syugyo_h]').val() + ':' + $('input[name=workshift_syugyo_m]').val() ),
          ( $('input[name=workshift_kyukei_1_h]').val() + ':' + $('input[name=workshift_kyukei_1_m]').val() ),
          ( $('input[name=workshift_kyukei_2_h]').val() + ':' + $('input[name=workshift_kyukei_2_m]').val() ),
          ( '' + $('select[name=workshift_worktype] option:selected').val() ).replace('undefined', ''),
        ],
      );

      for (
        var tbody_date = 1;
        tbody_date <= new Date(Number(targetMonth['year']), Number(targetMonth['month']), 0).getDate();
        tbody_date++
      ) {
        sectionId = ('00'+tbody_date).slice(-2);
        saveData.push(
            [
              targetMonth['year'] + '/' + targetMonth['month'] + '/' + sectionId,
              [
                ( Number( $('input[name=shigyo_h_'   + sectionId + ']').val() ) * 60 ) + Number( $('input[name=shigyo_m_'   + sectionId + ']').val() ),
                ( Number( $('input[name=syugyo_h_'   + sectionId + ']').val() ) * 60 ) + Number( $('input[name=syugyo_m_'   + sectionId + ']').val() ),
                ( Number( $('input[name=kyukei_1_h_' + sectionId + ']').val() ) * 60 ) + Number( $('input[name=kyukei_1_m_' + sectionId + ']').val() ),
                ( Number( $('input[name=kyukei_2_h_' + sectionId + ']').val() ) * 60 ) + Number( $('input[name=kyukei_2_m_' + sectionId + ']').val() ),
              ],
              ( '' + $('input[name=workshift_' + sectionId + ']').val() ).replace('undefined', ''),
              ( '' + $('input[name=bikou_'     + sectionId + ']').val() ),
            ]
        );
      }

      saveData = {
        'timetable_data': saveData,
      };
    /* </userData> */

    google_oauth_token = '';
    enviromentData = {
      'google_oauth_token': google_oauth_token,
    };
    console.log(saveData);
    localStorage.setItem( ((btoa(location.href)).slice(0, 16) + '.saveData' + targetMonth['year'] + targetMonth['month']), JSON.stringify(saveData) );

    alert('Saved!!');
  });

});
