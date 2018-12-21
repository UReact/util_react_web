

function getIntl(intl, key, defaultValue) {
  let value = defaultValue || key
  if (key) {
    value = intl.get(key) || defaultValue
  }
  return value;
}

module.exports = {
  getIntl,
}