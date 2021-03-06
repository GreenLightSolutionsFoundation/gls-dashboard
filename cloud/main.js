Parse.Cloud.beforeSave(Parse.User, function ensureUserDetails(request, response) {
  if (!request.object.get('email') || !request.object.get('username')) {
    response.error('email and username are required for signup');
  } else {
    response.success();
  }
});

Parse.Cloud.define('hello', function sayHello(request, response) {
  response.success('well, howdy partner!');
});
