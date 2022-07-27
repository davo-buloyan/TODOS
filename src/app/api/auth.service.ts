import { Injectable } from '@angular/core';

import { UserModel } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  getUser(): UserModel | null {
    try {
      const user = localStorage.getItem('authUser');

      if (user) {
        return JSON.parse(user);
      }

      return null;
    }
    catch (err) {
      return null;
    }
  }

  register(data: Omit<UserModel, 'id'>): UserModel | null {
    const users = localStorage.getItem('usersDB');

    if (!users) {
      const userModel = { ...data, id: 1 };
      localStorage.setItem('usersDB', JSON.stringify([userModel]));
      return userModel;
    }

    try {
      const usersArr = JSON.parse(users) as UserModel[];

      if (usersArr.some((_user) => _user.email === data.email)) {
        return null;
      }

      const userId = usersArr[usersArr.length - 1].id + 1;
      const userModel = { ...data, id: userId };
      usersArr.push(userModel);
      localStorage.setItem('usersDB', JSON.stringify(usersArr));
      return userModel;
    }
    catch (err) {
      localStorage.removeItem('usersDB');
      return this.register(data);
    }
  }

  login(data: Pick<UserModel, 'username' | 'password'>): UserModel | null {
    const users = localStorage.getItem('usersDB');

    if (users) {
      try {
        const usersArr = JSON.parse(users) as UserModel[];

        const user = usersArr.find((_user: UserModel) =>
          _user.username === data.username &&
          _user.password === data.password
        );

        if (user) {
          localStorage.setItem('authUser', JSON.stringify(user));
        }

        return user || null;
      }
      catch (err) {
        return null;
      }
    }
    else {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('authUser');
  }
}
