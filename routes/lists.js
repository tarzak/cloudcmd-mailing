/*
 * POST subscribe an email to a list.
 */

exports.subscribe = function(req, res){
  console.log('subscribe ' + req.body.email);
  mc.lists.subscribe({id: "cd1510a8c8", email:{email:req.body.email}, double_optin: false}, function(data) {
      console.log('User subscribed successfully!');
      console.log(req.body.email);
      res.redirect('/');
    },
    function(error) {
      if (error.error) {
        console.log(error.code + ": " + error.error);
      } else {
        console.log('There was an error subscribing that user');
      }
      res.redirect('/');
    });
};
