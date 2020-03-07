$(function(){
  $('img.rotationicon').click(function(){
    var dataobject = $(this);
    $({deg:0}).animate({deg:360}, {
      duration: 1000,
      easing: 'swing',

      // 途中経過
      progress:function() {
        dataobject.css({
          transform:'rotate(' + this.deg + 'deg)'
        });
      },

      // アニメーション完了
      complete:function() {}
    });
  });

  $('img.shifttime_copy').click(function(){
    var dataobject = $(this);

    var sectionId = ('00'+dataobject.attr('name')).slice(-2);

    $('input[name=shigyo_h_'   + sectionId + ']').val( $('input[name="workshift_shigyo_h"]').val() );
    $('input[name=shigyo_m_'   + sectionId + ']').val( $('input[name="workshift_shigyo_m"]').val() );
    $('input[name=syugyo_h_'   + sectionId + ']').val( $('input[name="workshift_syugyo_h"]').val() );
    $('input[name=syugyo_m_'   + sectionId + ']').val( $('input[name="workshift_syugyo_m"]').val() );
    $('input[name=kyukei_1_h_' + sectionId + ']').val( $('input[name="workshift_kyukei_1_h"]').val() );
    $('input[name=kyukei_1_m_' + sectionId + ']').val( $('input[name="workshift_kyukei_1_m"]').val() );
    $('input[name=kyukei_2_h_' + sectionId + ']').val( $('input[name="workshift_kyukei_2_h"]').val() );
    $('input[name=kyukei_2_m_' + sectionId + ']').val( $('input[name="workshift_kyukei_2_m"]').val() );
    $('input[name=workshift_'  + sectionId + ']').val(
      (
          $('input[name="workshift_shigyo_h"]').val()
        + $('input[name="workshift_shigyo_m"]').val()
        + $('input[name="workshift_syugyo_h"]').val()
        + $('input[name="workshift_syugyo_m"]').val()
      ).replace(/:/g, '')
    );

    $('#kintai_timetable tbody tr:nth-child('+sectionId+') input.timer_io').change();
  });

  $('img.shifttime_input').click(function(){
    var dataobject = $(this);
    var sectionId = ('00'+dataobject.attr('name')).slice(-2);

    $('input[name=workshift_' + sectionId + ']').val( ( '' + $('input[name=workshift_' + sectionId + ']').val() ).trim() );

    if (!$('input[name=workshift_' + sectionId + ']').attr('readonly')) {
      $('input[name=workshift_' + sectionId + ']').attr('readonly', true);
    } else {
      $('input[name=workshift_' + sectionId + ']').attr('readonly', false);
    }
  });

  $('img.datareset').click(function(){
    var dataobject = $(this);
    var sectionId = ('00'+dataobject.attr('name')).slice(-2);

    console.log($('#kintai_timetable tbody tr:nth-child('+sectionId+') input:not([type=button])'));

    $('#kintai_timetable tbody tr:nth-child('+sectionId+') input').val('');
    $('#kintai_timetable tbody tr:nth-child('+sectionId+') input').map(function(index_dom, dom){
      dom.className = (dom.className).replace(/err_.*/, '');
    });
    $('#kintai_timetable tbody tr:nth-child('+sectionId+') output').val('00:00');
  });
});
