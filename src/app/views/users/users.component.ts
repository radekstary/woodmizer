import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { User } from '../../mockData/users/user.interface';
import { USERS } from '../../mockData/users/users.mock';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTooltipModule,
    EllipsisPipe,
  ],
})
export class UsersComponent {
  public users: User[] = USERS;

  constructor(public auth: AuthService) {}

  selectUser(i: number) {
    this.auth.loginAs(this.users[i]);
  }
}
