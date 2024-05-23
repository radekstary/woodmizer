import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatIconModule } from '@angular/material/icon';
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
    MatTableModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  public users: User[] = USERS;

  public dataSource = new MatTableDataSource<User>(USERS);
  public displayedColumns: string[] = [
    'lname',
    'fname',
    'birthDate',
    'qtyOfCars',
  ];
  constructor(public auth: AuthService) {}

  ngAfterViewInit() {
    if (this.paginator !== undefined)
      this.dataSource.paginator = this.paginator;
  }

  selectUser(i: number) {
    this.auth.loginAs(this.users[i]);
  }

  onViewModeChange(e: MatButtonToggleChange) {
    console.log(e);
    setTimeout(() => {
      if (e.value === 'table' && this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }, 0);
  }
}
