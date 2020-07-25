var Service = require('node-windows').Service;
 
var svc = new Service({
  name:'download-bot-tweet',
  description: 'download-bot-tweet',
  script: 'E:\\download-bot-tweet\\backend\\src\\server'
});
 
svc.on('install',function(){
  svc.start();
});
 
svc.install();