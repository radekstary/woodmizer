import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../mockData/users/user.interface';
import { SessionStorageService } from './sessionStorageService/sessionStorage.service';
import { USERS } from '../mockData/users/users.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: WritableSignal<User | null>;
  constructor(private sessionStorage: SessionStorageService) {
    /* check if there is current user KeyField saved in sessionStorage and return it as a signal */
    this.currentUser = signal(this.getCurrentUserData());
  }

  private getCurrentUserId(): string | null {
    /* return curret user ID */
    return this.sessionStorage.get('Auth');
  }

  private getCurrentUserData(): User | null {
    const currentUserId = this.getCurrentUserId();
    const currentUser = USERS.find((user) => user.id === currentUserId);
    return currentUser ? currentUser : null;
  }

  public logout() {
    /* remove info about current user from sessionStorage */
    this.sessionStorage.remove('Auth');

    /* send a signal with null in place of current user ID */
    this.currentUser = signal(null);
  }

  public loginAs(user: User) {
    /* save current user ID in sessionStorage */
    const currentUserId = this.sessionStorage.set('Auth', user.id.toString());

    /* send signal with current user ID */
    this.currentUser = signal(this.getCurrentUserData());
  }
}
