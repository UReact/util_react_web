

function getIntl(intl, key, defaultValue, obj) {
  let value = defaultValue || key
  if (key) {
    if (obj) {
      value = intl.get(key, obj)
    } else {
      value = intl.get(key)
    }
    value = value || defaultValue || key
  }
  return value;
}

module.exports = {
  getIntl,
}