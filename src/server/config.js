/**
 * Created by chenjianjun on 16/3/5.
 */

module.exports = {
  APIPort: '7001',
  APIHost: (process.env.NODE_ENV === 'production')?'127.0.0.1':'120.25.252.134',
  BusApiPort: '8088',
  BusApiAPIHost: (process.env.NODE_ENV === 'production')?'127.0.0.1':'120.25.252.134',

};
