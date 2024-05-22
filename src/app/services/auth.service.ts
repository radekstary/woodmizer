import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../mockData/users/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: WritableSignal<boolean> = signal(false);
  public loggedInUser: User | undefined;
  public loggedUser: WritableSignal<User | undefined> = signal(undefined);
  constructor() {}

  loginAs(user: User) {
    this.loggedUser = signal(user);
  }

  logout() {
    this.loggedUser = signal(undefined);
  }
}
