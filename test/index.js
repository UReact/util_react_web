const assert = require('power-assert');
const util = require('../')
const { url, where } = util;

describe('Url test', () => {  

  it('urlToList test', () => {    
    const { urlToList } = url
    const testUrl = '/userinfo/2144/id';
    const arr = urlToList(testUrl);
    assert(arr.length === 3);
    assert(arr[0] === '/userinfo');
    assert(arr[1] === '/userinfo/2144');
    assert(arr[2] === '/userinfo/2144/id');
  });

  it('isUrl test', () => {    
    const { isUrl } = url
    const testUrl = 'http://baidu.com?a=1&b=2';
    const is = isUrl(testUrl);
    assert(is);
  });
  it('getPageQuery test', () => {    
    const { getPageQuery } = url
    const testUrl = 'http://baidu.com?a=1&b=2';
    const query = getPageQuery(testUrl);
    assert(query);
    assert(query.a === '1');
    assert(query.b === '2');
  });

  it('addQuery test', () => {    
    const { addQuery } = url
    const testUrl = 'http://baidu.com?a=1&b=2';
    const thisUrl = addQuery(testUrl, 'lan', 'en');
    assert(thisUrl);
    assert(thisUrl.indexOf('lan=en') > 0);
    assert(thisUrl.indexOf('a=1') > 0);
    assert(thisUrl.indexOf('b=2') > 0);
    assert(thisUrl.indexOf('baidu.com') > 0);
    assert(thisUrl === 'http://baidu.com?a=1&b=2&lan=en');
  });

  it('fixLan test', () => {    
    const { fixLan } = url
    let lan = fixLan({
      lan: 'en',
    })
    assert(lan === 'en-US');
    lan = fixLan({
      lan: 'zh',
    })
    assert(lan === 'zh-CN');

    lan = fixLan({
      lan: 'zh-CN',
    })
    assert(lan === 'zh-CN');

    lan = fixLan({
      lan: 'zh-cn',
    })
    assert(lan === 'zh-CN');

    lan = fixLan({
      lan: 'zh-cn',
      limitLanArr: ['zh-CN', 'en-US']
    })
    assert(lan === 'zh-CN');

    lan = fixLan({
      lan: 'en-US',
      limitLanArr: ['zh-CN']
    })
    assert(lan === 'zh-CN');

    lan = fixLan({
      lan: 'ab',
    })
    assert(lan === 'en-US');

    lan = fixLan({
      lan: 'ab',
      changeObj: {
        ab: 'zh-CN'
      }
    })
    assert(lan === 'zh-CN');

  });
});

describe('where test', () => {  
  it('should work', () => {    
    window = { navigator: { userAgent: 'MicroMessenger'}}
    let wh = where()
    assert(wh === 'wechat');

    window = { navigator: { userAgent: 'phone'}}
    wh = where()
    assert(wh === 'mobile');

    window = { navigator: { userAgent: 'pc'}} 
    wh = where()
    assert(wh === 'pc');
  });
});

