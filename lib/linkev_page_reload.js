$(function(){
  $('a[href="#page_reload"]').click(function(){
    var href = location.href;
    href = href.replace(/\#.*/g, '');
    href = href.replace(/\?.*/g, '');
    location.replace( href );
  });
});
