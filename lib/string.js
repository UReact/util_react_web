

function getIntl(intl, key, defaultValue) {
  let value = defaultValue
  if (key) {
    value = intl.get(key) || defaultValue
  }
  return value;
}

module.exports = {
  getIntl,
}