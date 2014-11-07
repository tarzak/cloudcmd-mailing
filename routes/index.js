var mcapi = require('../node_modules/mailchimp-api/mailchimp');

/*
 * GET home page.
 */

exports.index = function(req, res){
  mc.helper.ping(function(data) {
    res.render('index', { title: 'Home' });
  }, function(err) {
    console.log(err);
    if (err.name == 'Invalid_ApiKey') {
      res.locals.error_flash = "Invalid API key. Set it in app.js";
    } else if (error.error) {
      res.locals.error_flash = error.code + ": " + error.error;
    } else {
      res.locals.error_flash = "An unknown error occurred";
    }
    res.render('index', { title: 'Home' });
  });
};
