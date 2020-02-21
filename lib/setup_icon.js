$(function(){
  // page に icon が設定されていない場合 /lib/icon.png を使用する
  if($("[rel=icon]").length == 0){
    $("head").append('<link type="image/png" href="./lib/favicon/icon064.png" rel="icon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon128.png" rel="icon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon192.png" rel="icon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon256.png" rel="icon" />');
  }
  if($("[rel=favicon]").length == 0){
    $("head").append('<link type="image/png" href="./lib/favicon/icon064.png" rel="favicon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon128.png" rel="favicon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon192.png" rel="favicon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon256.png" rel="favicon" />');
  }
  if($("[rel=apple-touch-icon]").length == 0){
    $("head").append('<link type="image/png" href="./lib/favicon/icon064.png" rel="apple-touch-icon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon128.png" rel="apple-touch-icon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon192.png" rel="apple-touch-icon" />');
    $("head").append('<link type="image/png" href="./lib/favicon/icon256.png" rel="apple-touch-icon" />');
  }
});
