var twit = require('twit');
var fs = require('fs');
var os = require("os");
const http = require('https');

console.log('The bot is starting');

var T = new twit({
    consumer_key:         'MvOWYMdiL7mV91niTwoGypIzZ',
    consumer_secret:      'GeWkanPSXql3VKu1rydU2cTGSXJ9csKH4cYcDSYGTqBlUlyFcU',
    access_token:         '1280640385916821506-49OWhpTNmXqwicwf2K8gJjSNBahOG1',
    access_token_secret:  'oO8MYs2FBGiXoLGU631CpLrWu6EVt4oXPGo7FFQH3toqM',
    timeout_ms:           60*1000,  
    strictSSL:            true, 
  });

var stream = T.stream('statuses/filter', { track: ['Glee'] })

stream.on('tweet', function (tweet) {
        if (tweet.retweeted_status == null) {
            fs.appendFileSync("E:\\twitter-client\\arquivos\\log.txt", JSON.stringify(tweet, null, "  ")+os.EOL, function(erro) {
                if(erro) {
                    throw erro;
                }    
        }); 

        var caminhoArq = "E:\\twitter-client\\\arquivos\\\mp4\\";

        if (tweet.is_quote_status == false)  
        {
            if (tweet.extended_tweet != null) 
            {
                if (tweet.extended_tweet.extended_entities != null) 
                {
                    if (tweet.extended_tweet.extended_entities.media != null) 
                    {
                        if (tweet.extended_tweet.extended_entities.media[0].video_info != null) 
                        {
                            if (tweet.extended_tweet.extended_entities.media[0].video_info.variants[0] != null) 
                            {
                                for (var i = 0; i < tweet.extended_tweet.extended_entities.media[0].video_info.variants.length; i++) {

                                    if (tweet.extended_tweet.extended_entities.media[0].video_info.variants[i].content_type == "video/mp4") 
                                    {   
                                        var NomeArq = tweet.id_str;

                                        console.log(tweet.extended_tweet.extended_entities.media[0].video_info.variants[i].url)+NomeArq;                                      

                                        const file = fs.createWriteStream(caminhoArq+NomeArq+".mp4");
                                        const request = http.get(tweet.extended_tweet.extended_entities.media[0].video_info.variants[i].url, function(response) {
                                                response.pipe(file);                                
                                        });
                                    }
                                }

                            }                         
                        }
                    }
                }
            }
        }
    }
})