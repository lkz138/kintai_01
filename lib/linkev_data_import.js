$(function(){
  $('a[href="#data_import"]').click(function(){
    $('.modalBoxWindow').slideUp();
    $('textarea[name=kintai_timetable_dataImport_object]').val('');
    $('#kintai_timetable_dataImport').fadeIn();
  });

  $('a[href="#kintai_timetable_dataImport_run"]').click(function(){
    if( isJSON( $('textarea[name=kintai_timetable_dataImport_object]').val() ) ){
      var restoreData_raw = $('textarea[name=kintai_timetable_dataImport_object]').val();
      restoreData = JSON.parse( restoreData_raw );
      restoreData = restoreData.timetable_data;
      restoreData = restoreData[1];
      restoreData = restoreData[0];
      if( new Date(restoreData).getFullYear() > 0 ){
        console.log(
          ('0000'+new Date(restoreData).getFullYear()).slice(-4) + ('00'+(new Date(restoreData).getMonth()+1)).slice(-2)
        );
        localStorage.setItem( ((btoa(location.href)).slice(0, 16) + '.saveData' + ('0000'+new Date(restoreData).getFullYear()).slice(-4) + ('00'+(new Date(restoreData).getMonth()+1)).slice(-2)), restoreData_raw );
        $('a[href="#page_reload"]').click();
      }
    } else {
      alert('Oops, 読み取りできない形式のようです。正しい書式で入力してください。');
    }
  });
});
