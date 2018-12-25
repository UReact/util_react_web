const assert = require('power-assert');
const util = require('../')
const { url, where, string } = util;

describe('string test', () => {  
  
  describe('getLikeWhere test', () => { 
    const { getLikeWhere, getWhereObj } = string
    const testObj = {
      a: 'a',
      b: 'b',
      c: 'c'
    }
    const whereStr = getLikeWhere(testObj)
    const whereStr2 = getLikeWhere({})
    const whereStr3 = getLikeWhere()
    const whereObj = getWhereObj(whereStr)
    const whereObj2 = getWhereObj('adfasd')
    const whereObj3 = getWhereObj()
    

    it('getLikeWhere should work', () => {    
      assert(whereStr === '%7B%22a%22%3A%7B%22%24like%22%3A%22%25a%25%22%7D%2C%22b%22%3A%7B%22%24like%22%3A%22%25b%25%22%7D%2C%22c%22%3A%7B%22%24like%22%3A%22%25c%25%22%7D%7D');
    });
    it('getLikeWhere should 空字符串', () => {    
      assert(whereStr2 === '');
      assert(whereStr3 === '');
    });
   
    it('getWhereObj should work', () => {    
      assert(whereObj.a === 'a');
      assert(whereObj.b === 'b');
      assert(whereObj.c === 'c');
    });
    it('getWhereObj should 空对象', () => {    
      assert(JSON.stringify(whereObj2) === JSON.stringify({}));
      assert(JSON.stringify(whereObj3) === JSON.stringify({}));
    });

  });

  
  describe('getIntl test', () => { 
    const { getIntl } = string
    const intl = {
      get: key => `${key}_`
    }
    const key = 'key';
    const defaultValue = 'defaultValue';  
    const key1 = null;
    const defaultValue1 = null;
    const intl1 = {
      get: () => ''
    }
    it('should work', () => {    
      const value = getIntl(intl, key, defaultValue);
      assert(value === `${key}_`);
    });
    it('测试 key 为null', () => {    
      const value = getIntl(intl, key1, defaultValue);
      assert(value === defaultValue);
    });
    it('测试 defaultValue 为null', () => {    
      let value = getIntl(intl1, key, defaultValue1);
      assert(value === key);
      value = getIntl(intl1, key);
      assert(value === key);
    });
    it('测试 国际化没有值', () => {    
      const value = getIntl(intl1, key, defaultValue);
      assert(value === defaultValue);
    });
  })
});

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

