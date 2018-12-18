
import test from 'tape';
import { url } from '../index';

test('test url', (t) => {
  t.test('getPageQuery()', (st) => {
    const { getPageQuery } = url
    const testUrl = 'http://baidu.com?a=1&b=2';
    const query = getPageQuery(testUrl);
    st.deepEqual(query, {a: '1', b: '2'});
    st.end();
  })
});