const assert = require('power-assert');
const util = require('../')
const { url, where } = util;

describe('Url test', () => {  
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

