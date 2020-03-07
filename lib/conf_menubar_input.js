$(function(){
  // 備考 タブ幅 size 調整
  $('input[name="Bikou_tab_size"]').on('input', function(){
    $(this).next().text( (parseInt(this.value)) );
    $('#kintai_timetable tr input.bikou').css({
      width: parseInt(this.value),
    });
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ini', JSON.stringify({ Bikou_tab_size: parseInt(this.value) }) );
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ini_Bikou_tab_size', parseInt(this.value) );
  });

  // メニューアイコンサイズ 調整
  $('input[name="Menu_icon_size"]').on('input', function(){
    $(this).next().text( (parseInt(this.value)) );
    $('#menu_opener img').css({
      height: parseInt(this.value),
      width: parseInt(this.value),
    });
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ini', JSON.stringify({ Menu_icon_size: parseInt(this.value) }) );
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ini_Menu_icon_size', parseInt(this.value) );
  });

  // Google recaptcha 可視性 調整
  $('input[name="Google_recaptcha_visibility"]').on('input', function(){
    $(this).next().text( this.value * 100 + '%' );
    $('.grecaptcha-badge').css('opacity', parseFloat(this.value));
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ini', JSON.stringify({ Google_recaptcha_visibility: parseFloat(this.value) }) );
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ini_Google_recaptcha_visibility', parseFloat(this.value) );
  });
});
