

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

const getLikeWhere = ( values ) => {
  const whereObj = {};
  const keys = Object.keys(values)
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (values[key]) {
      whereObj[key] = { $like: `%${values[key]}%`}
    }
  }
  return encodeURIComponent(JSON.stringify(whereObj))
}

const getWhereObj = ( whereStr ) => {
  const whereObj = JSON.parse(decodeURIComponent(whereStr));
  const keys = Object.keys(whereObj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (whereObj[key].$like) {
      whereObj[key] = whereObj[key].$like.replace(/%/g, '');
    } 
  }
  return whereObj;
}

module.exports = {
  getIntl,
  getLikeWhere,
  getWhereObj
}