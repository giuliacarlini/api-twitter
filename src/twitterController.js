const T  = require('./twitConfig');
const functions = require("./functions");

module.exports = {
  async downloadTweet(request, response) {
    const id = request.params.id;
    var caminho = request.headers.caminho;

    T.get('statuses/show', { id: [id], trim_user: false, include_entities: true, include_ext_alt_text: true } , function(err, data, response) {     
      if (!err) {
        functions.DownloadTweet(data, caminho);        
      }        
    });   
    
    return response.status(200).send();    
  }
}


