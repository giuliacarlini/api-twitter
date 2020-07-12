const twit = require('twit');

var T = new twit(
    {
      consumer_key:         'MvOWYMdiL7mV91niTwoGypIzZ',
      consumer_secret:      'GeWkanPSXql3VKu1rydU2cTGSXJ9csKH4cYcDSYGTqBlUlyFcU',
      access_token:         '1280640385916821506-49OWhpTNmXqwicwf2K8gJjSNBahOG1',
      access_token_secret:  'oO8MYs2FBGiXoLGU631CpLrWu6EVt4oXPGo7FFQH3toqM',
      timeout_ms:           60*1000,  
      strictSSL:            true, 
    });

module.exports = T;