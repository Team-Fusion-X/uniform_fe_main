const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/8482', // 8482에 대한 요청을 처리
    createProxyMiddleware({
      target: 'http://orion.mokpo.ac.kr:8482', // 프록시 대상 서버 주소
      changeOrigin: true,
      pathRewrite: { '^/api/8482': '/api' }, // URL에서 /api/8482 부분을 /api로 재작성
    })
  );

  app.use(
    '/api/8582', // 8582에 대한 요청을 처리
    createProxyMiddleware({
      target: 'http://orion.mokpo.ac.kr:8582', // 프록시 대상 서버 주소
      changeOrigin: true,
      pathRewrite: { '^/api/8582': '/api' }, // URL에서 /api/8582 부분을 /api로 재작성
    })
  );
};
