function getTimer(millisec, default_month, default_year){
  var timer = new Date();

  default_year = Number(default_year);
  if (default_year > 0) { timer.setFullYear(default_year); }

  default_month = Number(default_month);
  if (default_month > 0) { timer.setMonth((default_month-1)); }

  timers = {};
  timers.year        = ( '000' + ( timer.getFullYear()  ) ).slice(-4);
  timers.month       = ( '000' + ( timer.getMonth() + 1 ) ).slice(-2);
  timers.date        = ( '000' + ( timer.getDate()      ) ).slice(-2);
  timers.hour        = ( '000' + ( timer.getHours()     ) ).slice(-2);
  timers.minute      = ( '000' + ( timer.getMinutes()   ) ).slice(-2);
  timers.second      = ( '000' + ( timer.getSeconds()   ) ).slice(-2);
  timers.millisecond = ( '000' + ( 0 ) ).slice(-3);

  timers.day         = ['日', '月', '火', '水', '木', '金', '土'][timer.getDay()];

  if (Boolean(millisec)) {
    timers.millisecond   = ( '000' + ( timer.getMilliseconds() ) ).slice(-3);
  }

  timers.datetime = timers.year + '/' + timers.month + '/' + timers.date + ' ' + timers.hour + ':' + timers.minute + ':' + timers.second;
  timers.datestr  = timers.year + '/' + timers.month + '/' + timers.date;
  timers.timestr  = timers.hour + ':' + timers.minute + ':' + timers.second;

  return timers;
}
