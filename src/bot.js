console.log('The bot is starting');
console.log('');
console.log('');
console.log('');


var twit = require('twit');
var fs = require('fs');
var os = require("os");

var T = new twit({
    consumer_key:         'MvOWYMdiL7mV91niTwoGypIzZ',
    consumer_secret:      'GeWkanPSXql3VKu1rydU2cTGSXJ9csKH4cYcDSYGTqBlUlyFcU',
    access_token:         '1280640385916821506-49OWhpTNmXqwicwf2K8gJjSNBahOG1',
    access_token_secret:  'oO8MYs2FBGiXoLGU631CpLrWu6EVt4oXPGo7FFQH3toqM',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  });

  //T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  //  console.log(data)
  //});

  //T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  //  console.log(data)
  //})

  //T.get('followers/ids', { screen_name: 'giuliacarlini' },  function (err, data, response) {
  //  console.log(data)
  //});


//fs.readFile("E:\\twitter-client\\log.txt", "utf-8", function(err, data) {
//    console.log(data);
//})

//var stream = T.stream('statuses/filter', { track: ['#DarkNetflix','#Dark'] })

var stream = T.stream('statuses/filter', { track: ['Glee'] })

stream.on('tweet', function (tweet) {
    if ((tweet.retweeted_status == null) 
    //&& (tweet.lang == 'pt')
    ) {
        //console.log(tweet.created_at);
        //console.log(tweet.text.replace(/(\r\n|\n|\r)/gm," "));
        //console.log('--------------------------------------');

    fs.appendFileSync("E:\\twitter-client\\arquivos\\log.txt", JSON.stringify(tweet, null, "  ")+os.EOL, function(erro) {
        if(erro) {
            throw erro;
        }    
    }); 

    if (tweet.is_quote_status == false)  {
        if (tweet.extended_tweet != null) {
            //console.log("1");
            if (tweet.extended_tweet.extended_entities != null) {
                //console.log("2");
                if (tweet.extended_tweet.extended_entities.media != null) {
                    console.log("3");
                    if (tweet.extended_tweet.extended_entities.media.video_info != null) {
                        console.log("4");
                        console.log(tweet.extended_tweet.full_text);    
                    }
                }
            }
        }
    }

    //T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
    //    })
    }
})