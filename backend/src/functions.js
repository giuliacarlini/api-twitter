const https = require('https');
var fs = require('fs');
var dateFormat = require('dateformat');

module.exports = {
    DownloadTweet(tweet, caminho, ehLocal) {
        if (tweet) {
            if (tweet.hasOwnProperty('extended_entities')) {
                
                if ((tweet.is_quote_status == false) && (tweet.extended_entities != null)) {   
                    for (var y = 0; y < tweet.extended_entities.media.length; y++) {
                        var media = tweet.extended_entities.media[y];
                        if (media.video_info != null) { 

                            var object = {}; 
                            var key = "media";
                            object[key] = [];

                            for (var i = 0; i < media.video_info.variants.length; i++) {   
                                var variants = media.video_info.variants[i];                                     

                                if (ehLocal) {       

                                    var extensao = retornaExtensaoArquivo(variants);
                    
                                    if (extensao) {
                                        const file = fs.createWriteStream(caminho+dateFormat(new Date(), "yyyymmddHHMMss")+"-"+tweet.user.screen_name+
                                                                                                    "-"+tweet.id_str+"-"+i+extensao);
                                        
                                        https.get(variants.url, function(response) {
                                        response.pipe(file);                                
                                        }); 
                                    }    
                                } else {
                                    var data = { url: variants.url };                                    
                                    object[key].push(data);
                                }
                            }          
                        }
                    }
                }  
            }          
        }
        
        return object;
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