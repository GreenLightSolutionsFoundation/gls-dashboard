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

  if (username.length === 0 || email.length === 0 || password.length === 0) {
    return Promise.reject(new Error('Email, username, and password are all required'));
  }

  if (!passwordConfirm !== !password) {
    return Promise.reject(new Error('Passwords to not match'));
  }

  if (!firstName || !lastName) {
    return Promise.reject(new Error('Please enter your first and last name'));
  }

  Object.assign(user, { username, password, email, firstName, lastName });
  return user.create();
}

export function adminCreate(details = {}) {
  const user = new parse.User();
  const {
    username,
    email,
    password,
    firstName,
    lastName,
  } = details;

  if (username.length === 0 || email.length === 0 || password.length === 0) {
    return Promise.reject(new Error('Email, username, and password are all required'));
  }

  if (!firstName || !lastName) {
    return Promise.reject(new Error('Please enter a first and last name'));
  }

  user.set('email', email);
  user.set('username', username);
  user.set('password', password);
  user.set('firstName', firstName);
  user.set('lastName', lastName);

  return user.save();
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
