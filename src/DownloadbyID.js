const https = require('https');
var fs = require('fs');
const T  = require('./twitConfig');

module.exports = {
  async index(request, response) {
    const id = request.params.id;
    const caminho = request.headers.caminho;

    T.get('statuses/show', { id: [id], trim_user: true, include_entities: true, include_ext_alt_text: true } , function(err, data, response) {     
      if (!err) {
        DownloadTweet(data, caminho);        
      }        
    });   
    
    return response.status(200).send();    
  }
}

function DownloadTweet(tweet, caminho) {
  if (tweet) {
    if (tweet.hasOwnProperty('extended_entities')) {
      if ((tweet.is_quote_status == false) && (tweet.extended_entities != null)) {   
        for (var y = 0; y < tweet.extended_entities.media.length; y++) {
          var media = tweet.extended_entities.media[y];
          if (media.video_info != null) {                  
            for (var i = 0; i < media.video_info.variants.length; i++) {   
                var variants = media.video_info.variants[i];      
                
                var extensao = retornaExtensaoArquivo(variants)

                if (extensao) {
                  const file = fs.createWriteStream(caminho+tweet.id_str+i+extensao);
                  
                  https.get(variants.url, function(response) {
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

function retornaExtensaoArquivo(variants) {
  var extensao;

  switch (variants.content_type) {  
    case  "video/mp4" :
      extensao = ".mp4";
      break;
  }

  return extensao;
}

