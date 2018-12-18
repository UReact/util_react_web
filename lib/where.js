

module.exports = function where() {
  const ua = window.navigator.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i)) {
    return 'wechat';
  }
  if (
    ua.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    return 'mobile';
  }
  return 'pc';
}