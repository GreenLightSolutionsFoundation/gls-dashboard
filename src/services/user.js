import User from '../models/user';
import UserDetail from '../models/userDetail';

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
  } = details;

  if (username.length === 0 || email.length === 0 || password.length === 0) {
    return Promise.reject(new Error('Email, username, and password are all required'));
  }

  if (!passwordConfirm !== !password) {
    return Promise.reject(new Error('Passwords to not match'));
  }

  // if (!firstName || !lastName) {
  //   return Promise.reject(new Error('Please enter your first and last name'));
  // }

  Object.assign(user, { username, password, email });
  return user.create()
    .then((newUser) => {
      const userDetail = new UserDetail();
      userDetail.create(newUser);
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
    chapter,
  } = details;

  if (username.length === 0 || email.length === 0 || password.length === 0) {
    return Promise.reject(new Error('Email, username, and password are all required'));
  }

  user.email = email;
  user.username = username;
  user.password = password;
  return user.save()
    .then((newUser) => {
      const userDetail = new UserDetail();
      userDetail.create(newUser);
      userDetail.firstName = firstName;
      userDetail.lastName = lastName;
      userDetail.createChapter(chapter);
      userDetail.save();
    });
}

export function logout() {
  return User.logout();
}

export function getCurrent() {
  return User.getCurrent();
}

export function getUser(user) {
  return user ? Promise.resolve(user) : getCurrent();
}

export function isAuthenticated(user) {
  return getUser(user).then(cUser => cUser.authenticated());
}

export function getFullName() {
  return UserDetail.fullName();
}

export function getUserDetail(user) {
  return UserDetail.fromUser(user);
}
