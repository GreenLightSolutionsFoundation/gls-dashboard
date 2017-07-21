Parse.Cloud.beforeSave(Parse.User, function ensureUserDetails(request, response) {
  if (!request.object.get('email') || !request.object.get('username')) {
    response.error('email is required for signup');
  } else {
    response.success();
  }
});
