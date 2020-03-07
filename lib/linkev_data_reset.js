$(function(){
  $('a[href="#data_reset"]').click(function(){
    if( window.confirm('Are you sure?') ){
      localStorage.clear();
    } else {
      alert('Oops, nothing to do.');
    }

    $('a[href="#page_reload"]').click();
  });
});
