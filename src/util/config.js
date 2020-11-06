
let apiUrl = ''
let calendarUrl = ''
if (process.env.VUE_APP_ENV === 'development') {
  apiUrl = 'http://10.10.4.70:8891/www/V1/pages/dailyTones.jsp',
  calendarUrl = 'http://10.10.4.70:8891/www/V1/pages/dailyTonesCalendar.jsp?dateStr='
} else if (process.env.VUE_APP_ENV === 'testfordev') {
  apiUrl = 'dailyTones.jsp',
  calendarUrl = 'dailyTonesCalendar.jsp?dateStr='
} else if (process.env.VUE_APP_ENV === 'production') {
  apiUrl = 'dailyTones.jsp',
  calendarUrl = 'dailyTonesCalendar.jsp?dateStr='
}
function getUrlKey (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ['', ''])[1].replace(/\+/g, '%20')) || null
}
export {
  apiUrl,
  calendarUrl,
  getUrlKey
}
