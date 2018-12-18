import { parse, stringify } from 'qs';


export function getPageQuery(url) {
  return parse((url || window.location.href).split('?')[1])
}

export function addQuery(url, key, value) {
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