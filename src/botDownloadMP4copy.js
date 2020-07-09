var twit = require('twit');
const http = require('https');
var url = require("url");
var fs = require('fs');

console.log('The bot is starting');

const argumento = process.argv.slice(2);
const [nome] = argumento;
const minhaUrl = new url.parse(nome);

var Myid = minhaUrl.path.substr(minhaUrl.path.indexOf("status/")+7,100);

console.log(Myid); 

var T = new twit({
    consumer_key:         'MvOWYMdiL7mV91niTwoGypIzZ',
    consumer_secret:      'GeWkanPSXql3VKu1rydU2cTGSXJ9csKH4cYcDSYGTqBlUlyFcU',
    access_token:         '1280640385916821506-49OWhpTNmXqwicwf2K8gJjSNBahOG1',
    access_token_secret:  'oO8MYs2FBGiXoLGU631CpLrWu6EVt4oXPGo7FFQH3toqM',
    timeout_ms:           60*1000,  
    strictSSL:            true, 
  });

  var tweet;

  console.log();

  var idInt = parseInt(Myid,10);
  console.log(idInt);
  console.log(Myid);

  T.get('statuses/show', { id: ["1281310387456151553"], trim_user: true, include_entities: true, include_ext_alt_text: true } , function(err, data, response) {
    var tweet = data;

    var caminhoArq = "E:\\twitter-client\\\arquivos\\\mp4\\";

    if (tweet.hasOwnProperty('extended_entities'))
    {
      console.log("eba");
    }

    if (tweet.is_quote_status == false)      
    {      
        if (tweet.extended_entities != null) 
        {
          if (tweet.extended_entities.media != null) 
          {
            for (var y = 0; y < tweet.extended_entities.media.length; y++) 
            {
              if (tweet.extended_entities.media[y].video_info != null) 
              {
                for (var i = 0; i < tweet.extended_entities.media[y].video_info.variants.length; i++) 
                {
                  if (tweet.extended_entities.media[y].video_info.variants[i] != null) 
                  {
                    if (tweet.extended_entities.media[y].video_info.variants[i].content_type == "video/mp4") 
                    {   
                        var NomeArq = tweet.id_str;

                        console.log(tweet.extended_entities.media[y].video_info.variants[i].url)+NomeArq;                                      

                        const file = fs.createWriteStream(caminhoArq+NomeArq+i+".mp4");
                        const request = http.get(tweet.extended_entities.media[y].video_info.variants[i].url, function(response) {
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
  })


