const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/pharmacies/info',
    createProxyMiddleware({
      target: 'https://api-qa-demo.nimbleandsimple.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/prod',
    createProxyMiddleware({
      target: 'https://s3-us-west-2.amazonaws.com/assets.nimblerx.com',
      changeOrigin: true,
    })
  );
};
