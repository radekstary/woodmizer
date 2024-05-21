import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { User } from '../../mockData/users/user.interface';
import { USERS } from '../../mockData/users/users.mock';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public users: User[] = USERS;
  public selectedUser: User | undefined = undefined

  selectUser(i:number) {
    this.selectedUser = this.users[i]
  }
}
