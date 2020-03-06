$(function(){
  $('a[href="#data_export"]').click(function(){
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

    /* Control the Blob on the Jquery https://www.sejuku.net/blog/67735 */
    var blobdata = new Blob([saveData], {type: 'text/plain'});

    $(this).attr({
      download: targetMonth['year'] + targetMonth['month'] + '_' + parseInt((new Date()).getTime()/1000) + '.txt',
      href: window.URL.createObjectURL(blobdata),
    });
  });
});
