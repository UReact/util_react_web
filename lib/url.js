"use strict";

const qs = require('qs');
const { parse, stringify } = qs;

const getPageQuery = (url) => {
  return parse((url || window.location.href).split('?')[1])
}

const addQuery = (url, key, value) => {
  let finalUrl = url
  if (value && key) {
    const urlArr = finalUrl.split('?')
    if (urlArr.length === 1) {
      finalUrl = `${finalUrl}?${key}=${value}`
    } else {
      const parms = parse(urlArr[1])
      parms[key] = value
      finalUrl = `${urlArr[0]}?${stringify(parms)}`
    }
  }
  return finalUrl;
}

const fixLan = ({lan, limitLanArr, changeObj}) => {
  changeObj = changeObj ||  {
    en: 'en-US',
    zh: 'zh-CN',
  };
  if (changeObj[lan]) {
    return changeObj[lan];
  }
  const arr = lan.split('-');
  if(arr.length > 1) {
    lan = `${arr[0]}-${arr[1].toUpperCase()}`;
  }
  if (limitLanArr) {
    if (!limitLanArr.includes(lan)) {
      lan = limitLanArr[0]
    }
    return lan;
  }
  if (!limitLanArr && arr.length > 1) {
    return lan;
  }
  return 'en-US';
};

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => {
  return reg.test(path);
}

// /userinfo/2144/id => ['/userinfo','/userinfo/2144','/userinfo/2144/id']
function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

module.exports = {
  getPageQuery,
  addQuery,
  fixLan,
  isUrl,
  urlToList
}