$(function(){
  $('a[href="#conf_setup"]').click(function(){
    $('#menu_bar').slideUp();

    // 備考 タブ幅 size 調整
    $('input[name="Bikou_tab_size"]').val(
      localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.ini_Bikou_tab_size' )
    );
    $('input[name="Bikou_tab_size"]').next().text(
      parseInt(
        localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.ini_Bikou_tab_size' )
      )
    );

    // メニューアイコンサイズ 調整
    $('input[name="Menu_icon_size"]').val(
      localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.ini_Menu_icon_size' )
    );
    $('input[name="Menu_icon_size"]').next().text(
      parseInt(
        localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.ini_Menu_icon_size' )
      )
    );

    // Google recaptcha 可視性 調整
    $('input[name="Google_recaptcha_visibility"]').val(
      localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.ini_Google_recaptcha_visibility' )
    );
    $('input[name="Google_recaptcha_visibility"]').next().text(
      localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.ini_Google_recaptcha_visibility' ) * 100 + '%'
    );

    $('#menu_config_bar').fadeIn('slow');
  });
});
