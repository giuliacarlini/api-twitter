const T = require('./twitConfig');
const functions = require("./functions");
require('dotenv').config();

console.log('The bot is starting');

var stream = T.stream('statuses/filter', { track: ['#OSegredoNaFloresta'] })

stream.on('tweet', function (tweet) {
    functions.DownloadTweet(tweet, process.env.caminhoArq);    
})