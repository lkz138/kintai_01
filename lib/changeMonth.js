function targetMonth_shift(offset){
  var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
  console.log( targetMonth );

  var targetMonthCurrent = new Date( Number(targetMonth['year']), Number(targetMonth['month']) - offset, 1);
  targetMonthCurrent.setMonth( targetMonthCurrent.getMonth() - offset);

  targetMonth.year  = ( '0000' + ( targetMonthCurrent.getFullYear() ) ).slice(-4);
  targetMonth.month = ( '00'   + ( targetMonthCurrent.getMonth() + 1 ) ).slice(-2);

  localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
  $('a[href="#page_reload"]').click();
}
function targetMonth_this(){
  var targetMonth = JSON.parse(localStorage.getItem( (btoa(location.href)).slice(0, 16) + '.targetMonth' ));
  targetMonth = {
    year: getTimer()['year'],
    month: getTimer()['month'],
  }
  localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.targetMonth', JSON.stringify(targetMonth) );
  $('a[href="#page_reload"]').click();
}
$(function(){
  $('a.month_next').click(function(){ targetMonth_shift(0); });
  $('a.month_prev').click(function(){ targetMonth_shift(1); });
  $('a.month_this').click(function(){ targetMonth_this();   });
});
