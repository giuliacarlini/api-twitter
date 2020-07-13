const T  = require('./twitConfig');
const functions = require("./functions");

module.exports = {
  async downloadTweet(request, response) {
    const id = request.params.id;
    const caminho = request.headers.caminho;

    const init = async() => {
      try {
        const tweet = await T.get('statuses/show', { id: [id], trim_user: false, include_entities: true, include_ext_alt_text: true });    
        return tweet.data;
      } catch(err) {
        return err.code;
      }
    };

    var data = await init();

    if (data == 144) {
      return response.status(404).json({error : "144 - Sem status para esse ID"});    
    }; 

    var urls = functions.DownloadTweet(data, caminho, false);

    if (urls) {
      return response.status(200).json(urls);    
    } else {
      return response.status(500).send();  
    }
      
  }
}



