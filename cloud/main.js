/*
* User cloud functions
*/

// ensure that new user accounts have an email address
Parse.Cloud.beforeSave(Parse.User, function ensureUserDetails(request, response) {
  if (!request.object.get('email') || !request.object.get('username')) {
    response.error('email and username are required for signup');
  } else {
    response.success();
  }
});

/*
*  Project cloud functions
*/

// when a user selects a project, add them to the project users array
Parse.Cloud.beforeSave(Parse.User, function updateProjectUsers(request, response) {
  var userId = request.object.get('id');
  var selectedProjects = request.object.get('selectedProjects');
  var usersQuery = new Parse.Query('Project');
  var selectedQuery = new Parse.Query('Project');

  // simple project validation
  if (selectedProjects.length !== 0 && selectedProjects.length !== 3) return response.error('You must select exactly 3 projects');

  // query projects with this user id, remove user if it's not in selectedProjects
  usersQuery.containsAll('selectedByUsers', [userId]);
  return usersQuery.find().then((projects) => {
    var tasks = [];
    projects.forEach((project) => {
      var userIndex = selectedProjects.indexOf(project.get('id'));
      var currentUsers = project.get('selectedByUsers');

      if (userIndex < 0) {
        project.set('selectedByUsers', currentUsers.splice(userIndex, 1));
        tasks.push(project.save());
      }
    });

    return Parse.Promise.when(tasks);
  })
  .then(() => {
    // add the user id to all three projects
    selectedQuery.containedIn('id', selectedProjects);
    return selectedQuery.find().then((projects) => {
      var tasks = [];
      projects.forEach((project) => {
        var currentUsers = project.get('selectedByUsers');
        if (currentUsers.indexOf(userId) < 0) {
          project.set('selectedByUsers', currentUsers.concat(userId));
          tasks.push(project.save());
        }
      });

      return Parse.Promise.when(tasks);
    });
  })
  .then(() => response.success())
  .catch(err => response.error(err));
});

// debugging route
Parse.Cloud.define('hello', function sayHello(request, response) {
  response.success('well, howdy partner!');
});
