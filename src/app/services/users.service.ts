import { Injectable } from '@angular/core';
import { USERS } from '../mockData/users/users.mock';
import { User } from '../mockData/users/user.interface';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  public getUsers(): Observable<User[]> {
    return of(USERS);
  }
  public getUser(id: string): Observable<User> {
    return this.getUsers().pipe(
      // (+) before `id` turns the string into a number
      map((users: User[]) => users.find((user) => user.id === id)!)
    );
  }
}
