const app = require('./app');

var porta = 3131;
app.listen(process.env.PORT || porta);
