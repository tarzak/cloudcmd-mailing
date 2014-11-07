var express = require('express')
  , routes = require('./routes')
  , lists = require('./routes/lists')
  , reports = require('./routes/reports')
  , http = require('http')
  , path = require('path')
  , mcapi = require('./node_modules/mailchimp-api/mailchimp')
  , location = require('./config.js');

var app = express();

// set MailChimp API key here
mc = new mcapi.Mailchimp('56c45e0ff8c1cdc80be5d79200a5f592-us9');


// all environments
app.set('port', process.env.PORT || 3000);
app.use('/',express.static(location));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.post('/lists/subscribe', lists.subscribe);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
