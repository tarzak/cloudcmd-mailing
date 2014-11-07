/*
 * GET list of lists.
 */

exports.list = function(req, res){
  mc.lists.list({}, function(data) {
    res.render('lists/index', { title: 'Your MailChimp Lists', lists: data.data });
  });
};

/*
 * GET info on a list.
 */

exports.view = function(req, res){
  mc.lists.list({filters:{list_id: req.params.id}}, function(listData) {
    var list = listData.data[0];
    mc.lists.members({id: req.params.id}, function(memberData) {
      res.render('lists/view', { title: list.title, list: list, members:memberData.data });
    }, function (error) {
      console.log(error);
      if (error.name == "List_DoesNotExist") {
        req.session.error_flash = "The list does not exist";
      } else if (error.error) {
        req.session.error_flash = error.code + ": " + error.error;
      } else {
        req.session.error_flash = "An unknown error occurred";
      }
      res.redirect('/lists');
    });
  });
};

/*
 * POST subscribe an email to a list.
 */

exports.subscribe = function(req, res){
  console.log('subscribe ' + req.body.email);
  mc.lists.subscribe({id: "cd1510a8c8", email:{email:req.body.email}, double_optin: false}, function(data) {
      console.log('User subscribed successfully! Look for the confirmation email.');
      console.log(req.body.email);
      res.redirect('/');
    },
    function(error) {
      if (error.error) {
        console.log(error.code + ": " + error.error);
      } else {
        console.log('There was an error subscribing that user');
      }
      res.redirect('/lists/'+req.params.id);
    });
};
