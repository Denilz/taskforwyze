// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://mcdonalds-live-engage-api-stage-1.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
