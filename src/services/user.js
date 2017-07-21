import User, { wrapUser } from '../models/user';
import Member from '../models/member';

export function login(username, password) {
  return User.login(username, password);
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
  return user.create()
  .then((newUser) => {
    const member = new Member();
    member.create(newUser);
  });
}

export function adminCreate(details = {}) {
  const user = new User();
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

  user.email = email;
  user.username = username;
  user.password = password;
  user.firstName = firstName;
  user.lastName = lastName;

  return user.save()
  .then((newUser) => {
    const member = new Member();
    member.create(newUser);
  });
}

export function logout() {
  return User.logout();
}

export function getCurrent() {
  const currentUser = wrapUser(User.getCurrent());

  if (currentUser) return Promise.resolve(currentUser);
  return Promise.resolve(null);
}

export function getUser(user) {
  return user ? Promise.resolve(user) : getCurrent();
}

export function isAuthenticated(user) {
  return getUser(user).then(cUser => cUser.authenticated());
}
