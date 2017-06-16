import parse from '../lib/parse';
import User, { wrapUser } from '../models/user';

export function login(username, password) {
  return parse.User.logIn(username, password);
}

export function create(details = {}) {
  const user = new User();

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

  Object.assign(user, { username, password, email, firstName, lastName });
  return user.create();
}

export function logout() {
  return parse.User.logOut();
}

export function getCurrent() {
  const currentUser = wrapUser(parse.User.current());

  if (currentUser) return Promise.resolve(currentUser);
  return Promise.resolve(null);
}

export function getUser(user) {
  return user ? Promise.resolve(user) : getCurrent();
}

export function isAuthenticated(user) {
  return getUser(user).then(cUser => cUser.authenticated());
}
