var twit = require('twit');
var fs = require('fs');
var os = require("os");
const http = require('https');

console.log('The bot is starting');
console.log('');
console.log('');
console.log('');

var T = new twit({
    consumer_key:         'MvOWYMdiL7mV91niTwoGypIzZ',
    consumer_secret:      'GeWkanPSXql3VKu1rydU2cTGSXJ9csKH4cYcDSYGTqBlUlyFcU',
    access_token:         '1280640385916821506-49OWhpTNmXqwicwf2K8gJjSNBahOG1',
    access_token_secret:  'oO8MYs2FBGiXoLGU631CpLrWu6EVt4oXPGo7FFQH3toqM',
    timeout_ms:           60*1000, 
    strictSSL:            true,     
  });

var stream = T.stream('statuses/filter', { track: ['#Dark','#DarkNetflix'], language: 'pt' })

stream.on('tweet', function (tweet) {
    if ((tweet.retweeted_status == null) && (tweet.is_quote_status == false)) 
    {       
        fs.appendFileSync("E:\\twitter-client\\arquivos\\logDark.txt", JSON.stringify(tweet, null, "  ")+os.EOL, function(erro) {
            if(erro) {
                throw erro;
            }    
        }); 

        T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
        })
    }
})