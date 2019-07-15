const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/img/w', { target: 'http://api.openweathermap.org' }));
  };