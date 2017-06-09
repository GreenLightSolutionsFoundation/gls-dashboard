import parse from '../lib/parse';

export function login(username, password) {
  return parse.User.logIn(username, password);
}

export function create(details = {}) {
  const user = new parse.User();

  const {
    username,
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
  } = details;

  if (!passwordConfirm !== !password) return Promise.reject('Passwords to not match');
  if (!firstName || !lastName) return Promise.reject('Please enter your first and last name');

  user.set('username', username);
  user.set('password', password);
  user.set('email', email);
  user.set('firstName', firstName);
  user.set('lastName', lastName);

  return user.signUp(null);
}

export function logout() {
  return parse.User.logOut();
}

export function getCurrent() {
  const currentUser = parse.User.current();

  if (currentUser) return Promise.resolve(currentUser);
  return Promise.resolve(null);
}

export function isAuthenticated(user) {
  if (!user) return Promise.resolve(user.authenticated());
  return getCurrent().then(cUser => cUser.authenticated());
}
