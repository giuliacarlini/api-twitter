const T = require('./twitConfig');
const functions = require("./functions");

console.log('The bot is starting');

var stream = T.stream('statuses/filter', { track: ['#OSegredoNaFloresta'] })

stream.on('tweet', function (tweet) {

    var caminhoArq = "E:\\twitter-client\\\arquivos\\\mp4\\";

    functions.DownloadTweet(tweet, caminhoArq);    
})